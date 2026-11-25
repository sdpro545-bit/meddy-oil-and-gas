import { NextResponse } from "next/server";

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX_REQUESTS = 5;
const ipHits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const cutoff = now - RATE_WINDOW_MS;
  const recent = (ipHits.get(ip) || []).filter((t) => t > cutoff);
  if (recent.length >= RATE_MAX_REQUESTS) {
    ipHits.set(ip, recent);
    return true;
  }
  recent.push(now);
  ipHits.set(ip, recent);
  return false;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  try {
    const forwarded = req.headers.get("x-forwarded-for");
    const ip =
      (forwarded ? forwarded.split(",")[0].trim() : null) ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many messages sent from this connection. Please wait a few minutes and try again.",
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, phone, company, service, message, consent, honeypot } = body || {};

    // Silent bot drop
    if (honeypot) {
      return NextResponse.json({
        success: true,
        message: "Thanks. We have your message and will reply soon.",
      });
    }

    if (!name || typeof name !== "string" || !name.trim() || name.trim().length > 200) {
      return NextResponse.json(
        { success: false, error: "Full Name is required." },
        { status: 400 }
      );
    }

    const emailTrimmed = typeof email === "string" ? email.trim() : "";
    if (!emailTrimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed) || emailTrimmed.length > 254) {
      return NextResponse.json(
        { success: false, error: "A valid business email is required." },
        { status: 400 }
      );
    }

    const msgTrimmed = typeof message === "string" ? message.trim() : "";
    if (!msgTrimmed) {
      return NextResponse.json(
        { success: false, error: "Project scope message is required." },
        { status: 400 }
      );
    }

    if (msgTrimmed.length > 5000) {
      return NextResponse.json(
        { success: false, error: "Message must be 5000 characters or fewer." },
        { status: 400 }
      );
    }

    if (consent !== true) {
      return NextResponse.json(
        { success: false, error: "Please confirm consent before submitting your inquiry." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const receiver = process.env.CONTACT_RECEIVER_EMAIL;
    const sender = process.env.CONTACT_FROM_EMAIL;

    if (!apiKey || !receiver || !sender) {
      return NextResponse.json(
        {
          success: false,
          error: "Messages cannot be sent from this page yet. Please try again later.",
        },
        { status: 503 }
      );
    }

    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(emailTrimmed);
    const safeCompany = escapeHtml(typeof company === "string" && company.trim() ? company.trim() : "Not specified");
    const safePhone = escapeHtml(typeof phone === "string" && phone.trim() ? phone.trim() : "Not provided");
    const safeService = escapeHtml(typeof service === "string" && service.trim() ? service.trim() : "General Inquiry");
    const safeMessage = escapeHtml(msgTrimmed).replace(/\n/g, "<br/>");

    const htmlBody = `
      <h2>New Website Inquiry</h2>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Organisation:</strong> ${safeCompany}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Phone:</strong> ${safePhone}</p>
      <p><strong>Service Scope:</strong> ${safeService}</p>
      <p><strong>Message:</strong></p>
      <p>${safeMessage}</p>
    `;

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: sender,
        to: [receiver],
        reply_to: emailTrimmed,
        subject: `Meddy Oil & Gas Inquiry: ${name.trim().slice(0, 80)}`,
        html: htmlBody,
      }),
    });

    if (!resendRes.ok) {
      console.error("[CONTACT_RESEND_ERROR]", resendRes.status);
      return NextResponse.json(
        {
          success: false,
          error: "Messages cannot be sent from this page yet. Please try again later.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Thanks. We have your message and will reply soon.",
    });
  } catch (error) {
    console.error("[CONTACT_API_ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        error: "Messages cannot be sent from this page yet. Please try again later.",
      },
      { status: 500 }
    );
  }
}
