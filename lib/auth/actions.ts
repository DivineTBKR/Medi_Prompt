"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  validateEmail,
  validatePassword,
  isValidSignupRole,
  type AuthFormState,
} from "@/lib/auth/validation";

// Works out the base web address of our own site, used to build the links we
// put in emails. Any trailing slash is removed so we never get double slashes.
function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/+$/, "");
}

// Creates a brand new account for a doctor or a patient and asks Supabase to
// email the person a link to prove the address is theirs. Sends them to a
// "check your inbox" page.
export async function signUp(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const fullName = String(formData.get("fullName") ?? "").trim();
  const role = formData.get("role");

  const emailError = validateEmail(email);
  if (emailError) return { error: emailError };
  const passwordError = validatePassword(password);
  if (passwordError) return { error: passwordError };
  if (!fullName) return { error: "Please enter your full name." };
  if (!isValidSignupRole(role)) {
    return { error: "Please choose whether you are a doctor or a patient." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // Extra info that the database picks up to build the person's profile.
      data: { role, full_name: fullName },
      emailRedirectTo: `${getSiteUrl()}/auth/confirm`,
    },
  });

  if (error) {
    // Kept vague on purpose: we never reveal whether an email is already taken.
    return { error: "We could not create your account. Please try again." };
  }

  redirect("/verify-email");
}

// Signs a person in with their email and password. On success they land on
// their dashboard; otherwise they get a clear error to show.
export async function logIn(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const emailError = validateEmail(email);
  if (emailError) return { error: emailError };
  if (!password) return { error: "Please enter your password." };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    // The same message whether the email or the password is wrong, on purpose.
    return { error: "Incorrect email or password." };
  }

  redirect("/dashboard");
}

// Signs the current person out and sends them back to the login page.
export async function logOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

// Starts the "forgot my password" flow by emailing a reset link. We always
// reply the same way so nobody can tell whether the address has an account.
export async function requestPasswordReset(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "").trim();

  const emailError = validateEmail(email);
  if (emailError) return { error: emailError };

  const supabase = await createClient();
  await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${getSiteUrl()}/auth/confirm?next=/reset-password`,
  });

  return {
    success:
      "If an account exists for that email, we've sent a link to reset your password.",
  };
}

// Saves a new password for the person who arrived from a reset email link.
export async function updatePassword(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const password = String(formData.get("password") ?? "");

  const passwordError = validatePassword(password);
  if (passwordError) return { error: passwordError };

  const supabase = await createClient();

  // Only somebody with a valid (reset) session may change the password.
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) {
    return {
      error: "Your reset link is invalid or has expired. Please request a new one.",
    };
  }

  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    return { error: "We could not update your password. Please try again." };
  }

  redirect("/dashboard");
}

// Starts changing the signed-in person's email. Supabase emails a confirmation
// link that the person must click before the change takes effect.
export async function requestEmailChange(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const newEmail = String(formData.get("email") ?? "").trim();

  const emailError = validateEmail(newEmail);
  if (emailError) return { error: emailError };

  const supabase = await createClient();

  // Make sure there is actually somebody signed in before we start.
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) {
    return { error: "You must be signed in to change your email." };
  }

  const { error } = await supabase.auth.updateUser(
    { email: newEmail },
    { emailRedirectTo: `${getSiteUrl()}/auth/confirm?next=/dashboard?email_changed=true` },
  );

  if (error) {
    return { error: "We could not start the email change. Please try again." };
  }

  return {
    success:
      "We've sent a confirmation link to that address. Please check your inbox to finish the change.",
  };
}

// Sends the "please confirm your email" link again, for people who never got
// the first one. Always replies the same way to avoid revealing accounts.
export async function resendVerificationEmail(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "").trim();

  const emailError = validateEmail(email);
  if (emailError) return { error: emailError };

  const supabase = await createClient();
  await supabase.auth.resend({
    type: "signup",
    email,
    options: { emailRedirectTo: `${getSiteUrl()}/auth/confirm` },
  });

  return {
    success:
      "If an account exists for that email, we've sent a new verification link.",
  };
}
