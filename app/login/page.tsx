"use client";

import Link from "next/link";
import { useActionState } from "react";
import { ShieldCheck } from "lucide-react";

import { logIn } from "@/lib/auth/actions";
import type { AuthFormState } from "@/lib/auth/validation";
import { AuthShell, Field } from "@/components/auth/auth-shell";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Nothing has been typed yet, so the form starts with no message.
const initialState: AuthFormState = {};

// Shows the sign-in form and any error that comes back from the server.
export default function LoginPage() {
  const [state, formAction, pending] = useActionState(logIn, initialState);

  return (
    <AuthShell
      badgeIcon={<ShieldCheck className="size-3.5" />}
      badge="Secure sign in"
      title="Welcome back."
      subtitle="Sign in to your account to continue."
      footer={
        <p>
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-primary hover:underline">
            Sign up
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

        <Field
          htmlFor="password"
          label="Password"
          hint={
            <Link href="/forgot-password" className="text-primary hover:underline">
              Forgot?
            </Link>
          }
        >
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="h-10 rounded-lg"
          />
        </Field>

        {state.error ? (
          <Alert variant="destructive">
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        ) : null}

        <Button type="submit" disabled={pending} className="h-10 w-full rounded-lg">
          {pending ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </AuthShell>
  );
}
