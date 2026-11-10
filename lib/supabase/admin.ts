import "server-only";

import { createClient } from "@supabase/supabase-js";

// Creates a Supabase connection with full admin powers. It must only ever run
// on the server, never in the browser, because the secret key can do anything.
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}
