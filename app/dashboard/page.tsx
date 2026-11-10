import { Suspense } from "react";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { logOut } from "@/lib/auth/actions";
import { ChangeEmailForm } from "./change-email-form";

// The bits of the page props we need: the "?email_changed=true" note from the link.
type DashboardPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

// Loads the signed-in person's account and shows their dashboard.
async function DashboardContent({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await connection();
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  // If nobody is signed in, send them to the login page.
  if (!data?.claims) {
    redirect("/login");
  }

  const email =
    typeof data.claims.email === "string" ? data.claims.email : "your account";

  const name =
    typeof data.claims.user_metadata?.full_name === "string"
      ? data.claims.user_metadata.full_name
      : "your account";

  // Look at the web address to see if we just changed the email address.
  const params = await searchParams;
  const emailJustChanged = params.email_changed === "true";

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Your dashboard</h1>
        <p className="text-sm text-zinc-500">Signed in as {name}</p>
      </div>

      {emailJustChanged ? (
        <p className="text-sm text-green-600">
          Your email address was updated.
        </p>
      ) : null}

      <section className="space-y-3 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
        <h2 className="text-sm font-medium">Change your email</h2>
        <ChangeEmailForm />
      </section>

      <form action={logOut}>
        <button
          type="submit"
          className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium dark:border-zinc-700"
        >
          Log out
        </button>
      </form>
    </div>
  );
}

// The protected dashboard page. The piece that needs the signed-in person
// streams in behind a loading message so the page still opens quickly.
export default function DashboardPage({ searchParams }: DashboardPageProps) {
  return (
    <main className="flex flex-1 items-center justify-center p-6">
      <Suspense fallback={<p className="text-sm text-zinc-500">Loading…</p>}>
        <DashboardContent searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
