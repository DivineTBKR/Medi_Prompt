import { createBrowserClient } from "@supabase/ssr";

// Creates the Supabase connection that runs in the visitor's web browser.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}
