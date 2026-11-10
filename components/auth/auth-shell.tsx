import Link from "next/link";
import { ShieldCheck } from "lucide-react";

import { Logo } from "@/components/logo";
import { Label } from "@/components/ui/label";

// The shared two-column frame every sign-in and sign-up screen sits inside.
export function AuthShell({
  badgeIcon,
  badge,
  title,
  subtitle,
  children,
  footer,
}: {
  badgeIcon: React.ReactNode;
  badge: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1fr_1.1fr]">
      <div className="relative hidden flex-col justify-between overflow-hidden border-r border-border bg-surface p-10 lg:flex">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_top_left,black_20%,transparent_70%)]" />
        <div className="relative">
          <Logo />
        </div>
        <div className="relative max-w-md space-y-6">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">Clinical · v1.0</p>
          <p className="text-3xl font-semibold leading-snug tracking-tight">
            &ldquo;Medi Prompt gave me back 90 minutes a day. I see my patients, not my
            keyboard.&rdquo;
          </p>
          <div className="flex items-center gap-3 pt-3">
            <div className="size-10 rounded-full bg-primary/15" />
            <div>
              <p className="text-sm font-medium">Dr. Elena Ruiz</p>
              <p className="text-xs text-muted-foreground">Internal Medicine · Madrid</p>
            </div>
          </div>
        </div>
        <div className="relative flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="size-3.5 text-success" /> HIPAA · GDPR · SOC 2 Type II
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center justify-between px-8 py-6">
          <div className="lg:hidden">
            <Logo />
          </div>
          <Link
            href="/"
            className="ml-auto text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Back to home
          </Link>
        </div>

        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-8 pb-16">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1 text-[11px] text-muted-foreground">
            {badgeIcon} {badge}
          </span>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>

          <div className="mt-8">{children}</div>

          {footer ? (
            <div className="mt-8 text-center text-xs text-muted-foreground">{footer}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

// A labelled row for one form input, with an optional small link on the right.
export function Field({
  htmlFor,
  label,
  hint,
  children,
}: {
  htmlFor: string;
  label: string;
  hint?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label htmlFor={htmlFor} className="text-xs text-foreground">
          {label}
        </Label>
        {hint ? <span className="text-[11px] font-normal text-muted-foreground">{hint}</span> : null}
      </div>
      {children}
    </div>
  );
}
