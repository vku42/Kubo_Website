import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import { z } from "zod";
import { Resend } from "resend";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const resend = new Resend(process.env.RESEND_API_KEY);

const supportSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(10),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = supportSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
    }

    const { name, email, subject, message } = validation.data;

    // 1. Save to Convex
    const ticketId = await convex.mutation(api.support.createTicket, {
      customerName: name,
      customerEmail: email,
      subject,
      message,
    });

    // 2. Notify Admin via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: "Kubo Support <onboarding@resend.dev>",
          to: "hello@kubobot.com", // Admin destination
          subject: `Support Ticket [#${ticketId.slice(-6).toUpperCase()}]: ${subject}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #f0f0f0; border-radius: 10px;">
              <h2 style="color: #1d1d1f;">New Support Request</h2>
              <p><strong>From:</strong> ${name} (${email})</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Ticket ID:</strong> ${ticketId}</p>
              <hr style="border: none; border-top: 1px solid #f0f0f0; margin: 20px 0;" />
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
          `,
        });

        // 3. Optional: Send Confirmation to Customer
        await resend.emails.send({
          from: "Kubo Bot <onboarding@resend.dev>",
          to: email,
          subject: `We've received your request [#${ticketId.slice(-6).toUpperCase()}]`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #f0f0f0; border-radius: 10px;">
              <h2 style="color: #1d1d1f;">Hello ${name},</h2>
              <p>We've received your request regarding <strong>"${subject}"</strong>.</p>
              <p>Our team is reviewing it and will get back to you within 24-48 hours.</p>
              <p>Ticket ID: <strong>${ticketId}</strong></p>
              <br/>
              <p>Stay tuned,<br/>Team Kubo</p>
            </div>
          `,
        });
      } catch (mailErr) {
        console.error("Support Email Failed:", mailErr);
      }
    }

    return NextResponse.json({ success: true, ticketId });
  } catch (error) {
    console.error("Support API Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
