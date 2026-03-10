// ==========================================
// 📁 app/api/contact/route.ts
// ==========================================

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// In-memory rate limiting (simple)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX = 3; // 3 requests per minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const requests = rateLimitMap.get(ip) || [];
  const recentRequests = requests.filter(
    (time) => now - time < RATE_LIMIT_WINDOW,
  );

  if (recentRequests.length >= RATE_LIMIT_MAX) {
    return false;
  }

  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);
  return true;
}

function sanitizeInput(input: string): string {
  return input.replace(/<[^>]*>/g, "").trim();
}

export async function POST(request: NextRequest) {
  try {
    // Get IP for rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown";

    // Rate limit check
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { ok: true, emailFailed: false, message: "თქვენი მოთხოვნა მიღებულია" },
        { status: 200 },
      );
    }

    const body = await request.json();

    // Extract and sanitize
    const name = sanitizeInput(body.name || "");
    const phone = sanitizeInput(body.phone || "");
    const message = sanitizeInput(body.message || "");
    const honeypot = body.website || ""; // Honeypot field

    // Validation
    if (!name || name.length < 2) {
      return NextResponse.json(
        { ok: false, error: "სახელი სავალდებულოა" },
        { status: 400 },
      );
    }

    if (!phone) {
      return NextResponse.json(
        { ok: false, error: "ტელეფონი სავალდებულოა" },
        { status: 400 },
      );
    }

    // Honeypot check
    if (honeypot) {
      console.log("🤖 Bot detected via honeypot");
      return NextResponse.json(
        { ok: true, emailFailed: false },
        { status: 200 },
      );
    }

    // Prepare email content
    const currentDate = new Date().toLocaleString("ka-GE", {
      timeZone: "Asia/Tbilisi",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    const emailHtml = `
      <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1a1a1a;">
        <div style="border-bottom: 2px solid #e5e5e5; padding-bottom: 16px; margin-bottom: 24px;">
          <h2 style="margin: 0; font-size: 20px; font-weight: 600;">ახალი მოთხოვნა ვებგვერდიდან</h2>
        </div>
        
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <p style="margin: 0 0 12px 0;"><strong>სახელი:</strong> ${name}</p>
          <p style="margin: 0 0 12px 0;"><strong>ტელეფონი:</strong> <a href="tel:${phone}" style="color: #1a1a1a;">${phone}</a></p>
          ${
            message
              ? `<p style="margin: 0;"><strong>მესიჯი:</strong><br/>${message}</p>`
              : ""
          }
        </div>
        
        <div style="padding-top: 16px; border-top: 1px solid #e5e5e5; font-size: 14px; color: #666;">
          <p style="margin: 4px 0;">წყარო: ვებგვერდი</p>
          <p style="margin: 4px 0;">დრო: ${currentDate}</p>
        </div>
      </div>
    `;

    const emailText = `
ახალი მოთხოვნა ვებგვერდიდან

სახელი: ${name}
ტელეფონი: ${phone}
${message ? `მესიჯი: ${message}` : ""}

წყარო: ვებგვერდი
დრო: ${currentDate}
    `.trim();

    // Send email via Resend
    let emailFailed = false;

    try {
      await resend.emails.send({
        from: "ComfortProGeorgia • Website <no-reply@comfortpro.webuild.ge>", // 🚨 CHANGE THIS TO YOUR VERIFIED DOMAIN =============================================
        to: ["tsotnetsirekidze22@gmail.com"], // 🚨 CHANGE TO CLIENT EMAIL ==================================================================
        subject: "ახალი მოთხოვნა ვებგვერდიდან",
        html: emailHtml,
        text: emailText,
      });

      console.log("✅ Email sent successfully");
    } catch (emailError) {
      console.error("❌ Email failed:", emailError);
      emailFailed = true;
    }

    // Always return success to user
    return NextResponse.json(
      {
        ok: true,
        emailFailed,
        message: "თქვენი მოთხოვნა მიღებულია",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("❌ API error:", error);

    // Even on error, return success to user
    return NextResponse.json(
      {
        ok: true,
        emailFailed: true,
        message: "თქვენი მოთხოვნა მიღებულია",
      },
      { status: 200 },
    );
  }
}

// ==========================================
// 📁 components/ContactForm.tsx (Updated)
// ==========================================

// ==========================================
// 📁 .env.local
// ==========================================

// ==========================================
// 📁 package.json (Add dependency)
// ==========================================

// ==========================================
// 🚀 DEPLOYMENT CHECKLIST
// ==========================================

/*
✅ 1. Create Resend account (resend.com)
✅ 2. Verify domain (renova.ge or your domain)
✅ 3. Add DNS records (SPF + DKIM) - Resend provides these
✅ 4. Get API key from Resend dashboard
✅ 5. Add RESEND_API_KEY to .env.local (development)
✅ 6. Add RESEND_API_KEY to Vercel/hosting env vars (production)
✅ 7. Change email addresses in route.ts:
   - from: "Your Brand • Website <no-reply@yourdomain.com>"
   - to: ["client@email.com"]
✅ 8. Change WHATSAPP_NUMBER in ContactForm.tsx
✅ 9. Test with real email
✅ 10. Monitor logs for first week
*/
