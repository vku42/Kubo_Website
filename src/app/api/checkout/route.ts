import { NextResponse } from "next/server";

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
    console.error("Instamojo Token Error:", error);
    return null;
  }
}

export async function POST(req: Request) {
  const { name, email, phone, address } = await req.json();
  const IS_PROD = process.env.INSTAMOJO_ENV === "prod";
  const API_URL = IS_PROD ? "https://api.instamojo.com/v2/payment_requests/" : "https://test.instamojo.com/v2/payment_requests/";

  // Log lead data for merchant visibility
  console.log("PRE-ORDER LEAD CAPTURED:", { name, email, phone, address, timestamp: new Date().toISOString() });

  const token = await getAccessToken();

  if (!token) {
    // Return error in production if keys are missing
    if (IS_PROD) return NextResponse.json({ error: "Payment configuration missing" }, { status: 500 });
    // In dev/test, return mock success message
    return NextResponse.json({ url: "" }, { status: 200 });
  }

  try {
    const payload = {
      amount: "2999",
      purpose: "Kubo Bot Pre-Order Batch 01",
      buyer_name: name || "Customer",
      email: email || "",
      phone: phone || "",
      redirect_url: "https://thekubobot.com/api/checkout/callback",
      send_email: true,
      send_sms: false,
      allow_repeated_payments: false,
    };

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    // V2 API returns 'longurl' in the root or 'payment_request.longurl'
    const longUrl = data.longurl || data.payment_request?.longurl;

    if (longUrl) {
      return NextResponse.json({ url: longUrl });
    } else {
      console.error("Instamojo API Error Response:", data);
      return NextResponse.json({ error: data.message || "Payment request failed" }, { status: 400 });
    }
  } catch (error) {
    console.error("Instamojo Server Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
