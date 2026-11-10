"use client";

import { useActionState } from "react";
import { KeyRound } from "lucide-react";

import { updatePassword } from "@/lib/auth/actions";
import type { AuthFormState } from "@/lib/auth/validation";
import { AuthShell, Field } from "@/components/auth/auth-shell";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Nothing has been typed yet, so the form starts with no message.
const initialState: AuthFormState = {};

// Lets a person who clicked the reset link choose a brand new password.
export default function ResetPasswordPage() {
  const [state, formAction, pending] = useActionState(
    updatePassword,
    initialState,
  );

  return (
    <AuthShell
      badgeIcon={<KeyRound className="size-3.5" />}
      badge="Account recovery"
      title="Choose a new password."
      subtitle="Pick something you haven't used before."
    >
      <form action={formAction} className="space-y-4">
        <Field htmlFor="password" label="New password">
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

        {state.error ? (
          <Alert variant="destructive">
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        ) : null}

        <Button type="submit" disabled={pending} className="h-10 w-full rounded-lg">
          {pending ? "Saving…" : "Save new password"}
        </Button>
      </form>
    </AuthShell>
  );
}
