import Link from "next/link";
import { Logo } from "@/components/logo";
import { CurrentYear } from "./current-year";

type FooterLink = { label: string; href: string };

// Public marketing footer: brand block, trust badges and link columns.
export function SiteFooter() {
  const columns: { title: string; links: FooterLink[] }[] = [
    {
      title: "Platform",
      links: [
        { label: "AI Consultation", href: "#" },
        { label: "Doctor Portal", href: "#" },
        { label: "Patient Portal", href: "#" },
        { label: "Prescription Builder", href: "#" },
        { label: "Analytics", href: "#" },
      ],
    },
    {
      title: "Trust",
      links: [
        { label: "HIPAA", href: "#" },
        { label: "GDPR", href: "#" },
        { label: "Security Whitepaper", href: "#" },
        { label: "Audit Logs", href: "#" },
        { label: "Status", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "#" },
        { label: "API Reference", href: "#" },
        { label: "Changelog", href: "#" },
        { label: "Medical Disclaimer", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "#" },
        { label: "Terms", href: "#" },
        { label: "DPA", href: "#" },
        { label: "Subprocessors", href: "#" },
        { label: "Cookie Settings", href: "#" },
      ],
    },
  ];
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_3fr]">
          <div className="space-y-4">
            <Logo />
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Clinical intelligence for the modern practitioner. Built with the rigor of medicine and
              the elegance of modern software.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                <span className="size-1.5 rounded-full bg-success" /> HIPAA
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                <span className="size-1.5 rounded-full bg-success" /> GDPR
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                <span className="size-1.5 rounded-full bg-success" /> SOC 2
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <h5 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {col.title}
                </h5>
                <ul className="mt-4 space-y-3 text-sm">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-foreground/80 transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground">
          <p>© <CurrentYear /> Medi Prompt · For licensed clinical use only.</p>
          <p className="font-mono uppercase tracking-widest">v 1.0 · build · clinical</p>
        </div>
      </div>
    </footer>
  );
}
