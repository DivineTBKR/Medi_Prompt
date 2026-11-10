"use client";

import { useActionState } from "react";

import { requestEmailChange } from "@/lib/auth/actions";
import type { AuthFormState } from "@/lib/auth/validation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Nothing has been typed yet, so the form starts with no message.
const initialState: AuthFormState = {};

// A small form on the dashboard that starts changing the signed-in email address.
export function ChangeEmailForm() {
  const [state, formAction, pending] = useActionState(
    requestEmailChange,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-3">
      <div className="space-y-1.5">
        <Label htmlFor="new-email" className="text-xs">
          New email address
        </Label>
        <Input
          id="new-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="h-10 rounded-lg"
        />
      </div>

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

      <Button type="submit" disabled={pending} className="h-10 rounded-lg">
        {pending ? "Sending…" : "Send confirmation link"}
      </Button>
    </form>
  );
}
