import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import { Resend } from "resend";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const resend = new Resend(process.env.RESEND_API_KEY || "re_123");

export async function POST(req: NextRequest) {
  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    // 🛡️ 1. Fetch Order Details from Convex
    const order = await convex.query(api.orders.getOrderById, { orderId });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // 🛡️ 2. Send Confirmation Email via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: "Kubo Bot <orders@kubobot.com>",
          to: order.customerEmail,
          reply_to: "hello@kubobot.com",
          subject: `Order Reserved: Your Kubo Bot (Order #${order._id.slice(-6).toUpperCase()})`,
          html: `
            <div style="background-color: #fbfbfd; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 40px 20px;">
              <div style="max-width: 500px; margin: 0 auto; background: white; border-radius: 24px; padding: 40px; box-shadow: 0 4px 24px rgba(0,0,0,0.04); border: 1px solid #f2f2f2;">
                <div style="text-align: center; margin-bottom: 32px;">
                  <span style="font-size: 40px;">🌙</span>
                </div>
                <h1 style="color: #1d1d1f; font-size: 28px; font-weight: 700; text-align: center; margin: 0 0 16px 0; letter-spacing: -0.5px;">Welcome to the Family.</h1>
                <p style="color: #86868b; font-size: 16px; line-height: 1.5; text-align: center; margin-bottom: 32px;">We've received your payment proof. Your Kubo Bot pre-order is now being verified and your unit is reserved in <strong>Batch 01</strong>.</p>
                
                <div style="background: #fbfbfd; border-radius: 16px; padding: 24px; margin-bottom: 32px;">
                  <div style="margin-bottom: 16px;">
                    <p style="text-transform: uppercase; font-size: 11px; font-weight: 600; color: #86868b; margin: 0 0 4px 0; letter-spacing: 1px;">Order Identifier</p>
                    <p style="font-family: monospace; font-size: 14px; font-weight: 700; color: #1d1d1f; margin: 0;">${order._id}</p>
                  </div>
                  <div>
                    <p style="text-transform: uppercase; font-size: 11px; font-weight: 600; color: #86868b; margin: 0 0 4px 0; letter-spacing: 1px;">Status</p>
                    <p style="font-size: 14px; font-weight: 700; color: #1d1d1f; margin: 0;">Proof Received (Awaiting Verification)</p>
                  </div>
                </div>

                <div style="text-align: center;">
                  <p style="color: #1d1d1f; font-size: 15px; font-weight: 600; margin: 0 0 8px 0;">Next Steps 🖤</p>
                  <p style="color: #86868b; font-size: 14px; line-height: 1.5; margin: 0;">Our team will verify the payment screenshot shortly. Once verified, you'll receive production updates as we assemble Batch 01.</p>
                </div>

                <div style="border-top: 1px solid #f2f2f2; margin-top: 40px; padding-top: 24px; text-align: center;">
                  <p style="color: #86868b; font-size: 12px; line-height: 1.6; margin: 0;">
                    Vehon Infotech<br />
                    Surat, Gujarat, India
                  </p>
                  <p style="color: #d2d2d7; font-size: 11px; margin: 16px 0 0 0;">
                    © 2026 Vehon Infotech. Designed in India.
                  </p>
                </div>
              </div>
            </div>
          `,
        });
        return NextResponse.json({ success: true });
      } catch (mailErr) {
        console.error("Email error:", mailErr);
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true, message: "Email not sent (no API key)" });

  } catch (error: any) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
