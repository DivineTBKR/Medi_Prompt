import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Creates a Supabase connection that runs on the server, remembering the
// signed-in person by reading and writing their login cookie.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        // Reads all the cookies the browser sent with this request.
        getAll() {
          return cookieStore.getAll();
        },
        // Saves the refreshed login cookies back to the browser.
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Some places (like a plain page during rendering) are not allowed to
            // write cookies. That is fine: the proxy refreshes the session for us.
          }
        },
      },
    },
  );
}
