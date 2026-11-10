"use client";

import Link from "next/link";
import { useActionState } from "react";
import { MailCheck } from "lucide-react";

import { resendVerificationEmail } from "@/lib/auth/actions";
import type { AuthFormState } from "@/lib/auth/validation";
import { AuthShell, Field } from "@/components/auth/auth-shell";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Nothing has been typed yet, so the form starts with no message.
const initialState: AuthFormState = {};

// Tells the person to check their inbox, and lets them ask for the email again.
export default function VerifyEmailPage() {
  const [state, formAction, pending] = useActionState(
    resendVerificationEmail,
    initialState,
  );

  return (
    <AuthShell
      badgeIcon={<MailCheck className="size-3.5" />}
      badge="Check your inbox"
      title="Check your inbox."
      subtitle="We've sent you a link to confirm your email address. Click it to finish creating your account."
      footer={
        <p>
          <Link href="/login" className="text-primary hover:underline">
            Back to sign in
          </Link>
        </p>
      }
    >
      <form action={formAction} className="space-y-4">
        <Field htmlFor="email" label="Didn't get it? Enter your email again">
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="h-10 rounded-lg"
          />
        </Field>

        {state.error ? (
          <Alert variant="destructive">
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        ) : null}
        {state.success ? (
          <Alert className="border-success/30 bg-success/10 text-success">
            <AlertDescription>{state.success}</AlertDescription>
          </Alert>
        ) : null}

        <Button type="submit" disabled={pending} className="h-10 w-full rounded-lg">
          {pending ? "Sending…" : "Resend verification email"}
        </Button>
      </form>
    </AuthShell>
  );
}
