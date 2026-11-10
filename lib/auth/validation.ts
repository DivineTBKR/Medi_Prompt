// This file holds the simple checks we run on email addresses and passwords
// before we send anything to Supabase, plus the shared shape of a form result.

// The little result our forms get back: an error to show, a success note, or nothing.
export type AuthFormState = {
  error?: string;
  success?: string;
};

// A basic email shape: something, an "@", something, a dot, and a short ending.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Checks that an email address looks like a real one. Gives back an error
// message to show the person, or nothing when the address looks fine.
export function validateEmail(email: string): string | null {
  if (!email) return "Please enter your email address.";
  if (!EMAIL_PATTERN.test(email)) return "Please enter a valid email address.";
  return null;
}

// Checks that a password is at least 8 characters long and has at least one
// letter and one number. Gives back an error message, or nothing when it is fine.
export function validatePassword(password: string): string | null {
  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }
  if (!/[A-Za-z]/.test(password)) {
    return "Password must contain at least one letter.";
  }
  if (!/[0-9]/.test(password)) {
    return "Password must contain at least one number.";
  }
  return null;
}

// The only roles a person is allowed to pick when signing up.
export const SIGNUP_ROLES = ["patient", "doctor"] as const;
export type SignupRole = (typeof SIGNUP_ROLES)[number];

// Checks that the chosen role is one we allow. Anything else (including "admin")
// is rejected, so nobody can sneak in as an administrator.
export function isValidSignupRole(value: unknown): value is SignupRole {
  return typeof value === "string" && (SIGNUP_ROLES as readonly string[]).includes(value);
}