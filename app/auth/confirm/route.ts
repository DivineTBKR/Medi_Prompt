import { type EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Makes sure the "where to go next" address stays inside our own site, so
// nobody can use an email link to send a person to a different website.
function safeNextPath(value: string | null, fallback: string): string {
  if (value && value.startsWith("/") && !value.startsWith("//")) return value;
  return fallback;
}

// Handles the link a person clicks in their email. It works out which kind of
// link it is (new default style or custom-template style), checks it with
// Supabase, signs the person in, and sends them to the right page.
// If anything goes wrong they land on the error page.
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;

  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next");

  const supabase = await createClient();

  // Style 1: the default Supabase email link, which carries a one-time "code".
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(new URL(safeNextPath(next, "/dashboard"), origin));
    }
    // TEMPORARY: shows the real reason in the terminal. Remove before launch.
    console.error("confirm (code) failed:", error.message);
  }

  // Style 2: a custom email template link with "token_hash" and "type".
  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
    if (!error) {
      const fallback = type === "recovery" ? "/reset-password" : "/dashboard";
      return NextResponse.redirect(new URL(safeNextPath(next, fallback), origin));
    }
    // TEMPORARY: shows the real reason in the terminal. Remove before launch.
    console.error("confirm (token_hash) failed:", error.message);
  }

  return NextResponse.redirect(new URL("/error", origin));
}