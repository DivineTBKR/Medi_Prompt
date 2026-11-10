"use client";

import Link from "next/link";
import { useActionState } from "react";
import { KeyRound } from "lucide-react";

import { requestPasswordReset } from "@/lib/auth/actions";
import type { AuthFormState } from "@/lib/auth/validation";
import { AuthShell, Field } from "@/components/auth/auth-shell";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Nothing has been typed yet, so the form starts with no message.
const initialState: AuthFormState = {};

// Lets a person ask for a password reset link by entering their email.
export default function ForgotPasswordPage() {
  const [state, formAction, pending] = useActionState(
    requestPasswordReset,
    initialState,
  );

  return (
    <AuthShell
      badgeIcon={<KeyRound className="size-3.5" />}
      badge="Account recovery"
      title="Reset your password."
      subtitle="Enter your email and we'll send you a link to choose a new one."
      footer={
        <p>
          <Link href="/login" className="text-primary hover:underline">
            Back to sign in
          </Link>
        </p>
      }
    >
      <form action={formAction} className="space-y-4">
        <Field htmlFor="email" label="Email">
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
          {pending ? "Sending…" : "Send reset link"}
        </Button>
      </form>
    </AuthShell>
  );
}
