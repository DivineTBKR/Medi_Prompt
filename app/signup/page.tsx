"use client";

import Link from "next/link";
import { useActionState } from "react";
import { UserPlus } from "lucide-react";

import { signUp } from "@/lib/auth/actions";
import type { AuthFormState } from "@/lib/auth/validation";
import { AuthShell, Field } from "@/components/auth/auth-shell";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Nothing has been typed yet, so the form starts with no message.
const initialState: AuthFormState = {};

// Shows the account creation form and any error that comes back from the server.
export default function SignUpPage() {
  const [state, formAction, pending] = useActionState(signUp, initialState);

  return (
    <AuthShell
      badgeIcon={<UserPlus className="size-3.5" />}
      badge="Create your account"
      title="Get started."
      subtitle="We'll email you a link to confirm your address."
      footer={
        <p>
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      }
    >
      <form action={formAction} className="space-y-4">
        <Field htmlFor="fullName" label="Full name">
          <Input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            required
            className="h-10 rounded-lg"
          />
        </Field>

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

        <Field htmlFor="password" label="Password">
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            className="h-10 rounded-lg"
          />
          <p className="text-xs text-muted-foreground">
            At least 8 characters, with a letter and a number.
          </p>
        </Field>

        <Field htmlFor="role" label="I am a…">
          <select
            id="role"
            name="role"
            required
            defaultValue=""
            className="h-10 w-full rounded-lg border border-input bg-transparent px-3 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="" disabled>
              Select your role
            </option>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
        </Field>

        {state.error ? (
          <Alert variant="destructive">
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        ) : null}

        <Button type="submit" disabled={pending} className="h-10 w-full rounded-lg">
          {pending ? "Creating account…" : "Sign up"}
        </Button>
      </form>
    </AuthShell>
  );
}
