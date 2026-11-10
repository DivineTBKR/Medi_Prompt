import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

// Runs before every page loads to keep the visitor's login fresh and to keep
// private pages private. It simply hands the work to updateSession.
export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

// Tells Next.js which requests this should run on. We skip plain files like
// stylesheets, scripts, images and the favicon so they load without any delay.
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
