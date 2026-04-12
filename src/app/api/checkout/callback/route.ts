import { NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

async function getAccessToken() {
  const CLIENT_ID = process.env.INSTAMOJO_CLIENT_ID;
  const CLIENT_SECRET = process.env.INSTAMOJO_CLIENT_SECRET;
  const IS_PROD = process.env.INSTAMOJO_ENV === "prod";
  const AUTH_URL = IS_PROD ? "https://api.instamojo.com/oauth2/token/" : "https://test.instamojo.com/oauth2/token/";

  if (!CLIENT_ID || !CLIENT_SECRET) return null;

  try {
    const response = await fetch(AUTH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }).toString(),
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Callback Token Error:", error);
    return null;
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const paymentRequestId = searchParams.get("payment_request_id");
  const paymentId = searchParams.get("payment_id");

  if (!paymentRequestId) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const token = await getAccessToken();
  const IS_PROD = process.env.INSTAMOJO_ENV === "prod";
  const API_URL = IS_PROD 
    ? `https://api.instamojo.com/v2/payment_requests/${paymentRequestId}/` 
    : `https://test.instamojo.com/v2/payment_requests/${paymentRequestId}/`;

  let status = "failed";

  if (token) {
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      // Check if the payment request is completed or if specific payment is successful
      if (data.status === "Completed" || data.status === "Sent") {
        // Double check specific payment status if needed, but 'Completed' usually means paid
        status = "paid";
      }
    } catch (error) {
      console.error("Instamojo Status Verification Error:", error);
    }
  }

  // Update Convex
  try {
    await convex.mutation(api.orders.markOrderAsPaid, {
      paymentId: paymentRequestId,
      newStatus: status,
    });
  } catch (dbErr) {
    console.error("Convex Status Update Error:", dbErr);
  }

  // Redirect to success or failure page
  if (status === "paid") {
    return NextResponse.redirect(new URL(`/buy/success?id=${paymentRequestId}`, req.url));
  } else {
    // If it failed or was cancelled, send them back to buy page with an error
    return NextResponse.redirect(new URL("/buy?error=payment_failed", req.url));
  }
}
