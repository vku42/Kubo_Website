import React from "react";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import { z } from "zod";
import { Resend } from "resend";
import { OrderReceiptEmail } from "../../../components/emails/OrderReceipt";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const resend = new Resend(process.env.RESEND_API_KEY || "re_123");

// 🛡️ Security: Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const LIMIT = 5; // 5 requests per minute
const WINDOW = 60000;

// 🛡️ Security: Strict input validation schema
const checkoutSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(10).max(15),
  address: z.string().min(10).max(500),
  customerUpiId: z.string().optional(),
  paymentMethod: z.enum(["manual_upi", "instamojo"]),
  website_url: z.string().max(0).optional(), // Honeypot trap
});

async function getAccessToken() {
  const CLIENT_ID = process.env.INSTAMOJO_CLIENT_ID;
  const CLIENT_SECRET = process.env.INSTAMOJO_CLIENT_SECRET;
  const IS_PROD = process.env.INSTAMOJO_ENV === "prod";
  const AUTH_URL = IS_PROD ? "https://api.instamojo.com/oauth2/token/" : "https://test.instamojo.com/oauth2/token/";

  if (!CLIENT_ID || !CLIENT_SECRET) return null;

  try {
    const response = await fetch(AUTH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }).toString(),
    });

    if (!response.ok) return null;
    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Auth Fail:", error);
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    
    // 🛡️ 1. Rate Limiting Check
    const rateLimit = rateLimitMap.get(ip) || { count: 0, lastReset: now };
    if (now - rateLimit.lastReset > WINDOW) {
      rateLimit.count = 0;
      rateLimit.lastReset = now;
    }
    rateLimit.count++;
    rateLimitMap.set(ip, rateLimit);

    if (rateLimit.count > LIMIT) {
      return NextResponse.json({ error: "Too many attempts. Please wait a minute." }, { status: 429 });
    }

    const body = await req.json();

    // 🛡️ 2. Validation & Honeypot Check
    const validation = checkoutSchema.safeParse(body);
    if (!validation.success || body.website_url) {
      return NextResponse.json({ error: "Invalid request or bot detected" }, { status: 400 });
    }

    const { name, email, phone, address, customerUpiId, paymentMethod } = validation.data;
    const IS_PROD = process.env.INSTAMOJO_ENV === "prod";
    const API_URL = IS_PROD ? "https://api.instamojo.com/v2/payment_requests/" : "https://test.instamojo.com/v2/payment_requests/";
    
    const headerList = await headers();
    const host = headerList.get("host") || "localhost:3000";
    const proto = headerList.get("x-forwarded-proto") || "http";
    const baseUrl = `${proto}://${host}`;

    // 🛡️ 3. Save Lead to Convex
    let orderId;
    try {
      orderId = await convex.mutation(api.orders.createPendingOrder, {
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          shippingAddress: address,
          amount: 2999,
          paymentMethod: paymentMethod,
          customerUpiId: customerUpiId
      });

      // 📧 Security: Send Automated Confirmation Email
      if (orderId && process.env.RESEND_API_KEY) {
        try {
          await resend.emails.send({
            from: "Kubo Bot <onboarding@resend.dev>",
            to: email,
            subject: `Order Reserved: ${orderId}`,
            react: <OrderReceiptEmail 
              customerName={name} 
              orderId={orderId} 
              amount="2999" 
              upiId="thekubo@pthdfc" 
            />,
          });
          console.log("Confirmation Email Sent to:", email);
        } catch (mailErr: any) {
          console.error("📧 Email Delivery Failed:", {
            error: mailErr.message || mailErr,
            recommendation: "If you are in Sandbox mode, ensure the 'To' address matches your Resend account email."
          });
        }
      }
    } catch (dbErr) {
      console.error("DB Save Fail:", dbErr);
    }

    // 4. Handle Manual UPI
    if (paymentMethod === "manual_upi") {
      return NextResponse.json({ success: true, method: "manual", orderId });
    }

    // 5. Handle Instamojo
    const token = await getAccessToken();
    if (!token) {
      // Return empty URL in dev if keys missing, error in prod
      if (IS_PROD) return NextResponse.json({ error: "Payment Gateway Error" }, { status: 500 });
      return NextResponse.json({ url: "" });
    }

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: "2999",
        purpose: "Kubo Bot Pre-Order",
        buyer_name: name,
        email: email,
        phone: phone,
        redirect_url: `${baseUrl}/api/checkout/callback`,
        send_email: true,
        allow_repeated_payments: false,
      }),
    });

    const data = await response.json();
    const longUrl = data.longurl || data.payment_request?.longurl;

    if (longUrl) return NextResponse.json({ url: longUrl });
    return NextResponse.json({ error: "Gateway Request Failed" }, { status: 400 });

  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
