import Link from "next/link";

// A friendly page shown when an email link does not work, so the person is not
// left staring at a broken screen.
export default function ErrorPage() {
  return (
    <main className="flex flex-1 items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-4 text-center">
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="text-sm text-zinc-500">
          That link is invalid or has expired. Please try again, or request a
          fresh link.
        </p>
        <div className="flex flex-col gap-2 text-sm">
          <Link href="/login" className="underline">
            Go to sign in
          </Link>
          <Link href="/forgot-password" className="underline">
            Reset your password
          </Link>
        </div>
      </div>
    </main>
  );
}
