import { Resend } from "resend";

const resend = new Resend("re_MmtKd1Ry_L6ZNjakpUt9grgcTvdNds9yv");

async function test() {
  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "vupadhyay42@gmail.com", // I'll try sending to a likely owner email or standard test
      subject: "Resend Test",
      html: "<p>Testing API Key.</p>",
    });

    if (error) {
      console.error("Resend Error:", error);
    } else {
      console.log("Resend Success:", data);
    }
  } catch (err) {
    console.error("Catch Error:", err);
  }
}

test();
