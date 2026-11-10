import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Checks who is logged in and renews their login so they don't get kicked out
// unexpectedly. If nobody is logged in and they are heading to a private page,
// it sends them to the login page instead.
export async function updateSession(request: NextRequest) {
  // Start with a plain response we will later attach refreshed cookies to.
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        // Reads the cookies that came with this request.
        getAll() {
          return request.cookies.getAll();
        },
        // Saves refreshed login cookies so the visitor stays signed in.
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  // Ask Supabase who this is. This also quietly renews the login if needed.
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  const path = request.nextUrl.pathname;
  const isProtectedRoute = path === "/dashboard" || path.startsWith("/dashboard/");

  // If they are not logged in and the page is private, send them to log in.
  if (!user && isProtectedRoute) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
  }

  // Hand back the response that carries any refreshed login cookies.
  return supabaseResponse;
}
