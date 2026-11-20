import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, service, message, honeypot } = body;

    // 1. Silent bot drop
    if (honeypot) {
      return NextResponse.json({ success: true, message: "Inquiry recorded" });
    }

    // 2. Validate required fields
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Full Name is required." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "A valid business email is required." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { success: false, error: "Project scope message is required." },
        { status: 400 }
      );
    }

    // 3. Log inquiry cleanly for operations coordination
    console.log(`[CONTACT_INQUIRY] New submission from ${name} (${company || "N/A"}) <${email}> for service "${service || "General"}"`);

    // In production with Resend/Postmark/Sendgrid configured, dispatch transactional email here
    const receiver = process.env.CONTACT_RECEIVER_EMAIL || process.env.NEXT_PUBLIC_SITE_EMAIL || "info@meddyoilandgas.com";

    return NextResponse.json({
      success: true,
      message: `Your inquiry has been logged with our Lagos engineering coordination desk (${receiver}).`,
    });
  } catch (error: any) {
    console.error("[CONTACT_API_ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Failed to process inquiry. Please try again or email us directly." },
      { status: 500 }
    );
  }
}
