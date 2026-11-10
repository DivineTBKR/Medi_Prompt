"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ShieldCheck, Sparkles, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";

const SUGGESTIONS = [
  "How does the platform work?",
  "I have a headache and nausea since yesterday",
  "Is patient data secure?",
];

type ChatMessage = { id: number; role: "user" | "assistant"; text: string };

// Picks a canned reply so the landing demo feels responsive without any live AI backend.
function replyFor(text: string): string {
  const q = text.toLowerCase();
  if (q.includes("secure") || q.includes("data") || q.includes("privacy") || q.includes("hipaa")) {
    return "Patient data is siloed per clinic, encrypted at rest and in transit, and never used to train models. Sign in to see the full security posture.";
  }
  if (q.includes("how") || q.includes("work") || q.includes("platform")) {
    return "Patients complete a guided intake, the assistant drafts a structured summary, and a licensed clinician reviews and signs before anything reaches the patient.";
  }
  return "This landing-page demo only shows the experience — it can't give medical advice. Register to use the full guided intake, summaries and clinician review.";
}

// Hero section: headline, calls to action and a self-contained demo chat panel.
export function HeroChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);

  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: scrollerRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const onSubmit = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    setInput("");
    setMessages((prev) => [...prev, { id: idRef.current++, role: "user", text: trimmed }]);
    setLoading(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: idRef.current++, role: "assistant", text: replyFor(trimmed) }]);
      setLoading(false);
    }, 650);
  };

  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* ambient grid bg */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
      <div className="pointer-events-none absolute -right-40 top-20 size-[480px] rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 size-[420px] rounded-full bg-success/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pt-20 pb-24 lg:grid-cols-[1fr_500px] lg:gap-16 lg:pt-28 lg:pb-32">
        <div className="flex flex-col justify-center animate-stream-in">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/15 bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            Live AI Clinical Demo
          </span>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-[64px] lg:leading-[1.05]">
            Your AI Clinical{" "}
            <span className="bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent">
              Assistant.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
            Reduce consultation time. Improve patient care. Let AI collect information, draft reports
            and detect interactions — while you focus on medicine. Every recommendation reviewed by a
            licensed physician.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button size="lg" asChild className="rounded-full px-6 h-12">
              <Link href="/signup">
                <Stethoscope className="size-4" />
                Register as Doctor
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-full px-6 h-12">
              <Link href="/login">
                Patient Login <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-3 max-w-md gap-6 border-t border-border pt-6">
            <Metric value="68%" label="Time saved per visit" />
            <Metric value="12k+" label="Clinicians onboard" />
            <Metric value="99.99%" label="Uptime SLA" />
          </div>
        </div>

        {/* Chat panel */}
        <div className="relative animate-stream-in [animation-delay:120ms]">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-success/10 blur-2xl" />
          <div className="relative flex h-[640px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-clinical">
            <header className="flex items-center justify-between border-b border-border bg-surface/80 px-4 py-3 backdrop-blur">
              <div className="flex items-center gap-2.5">
                <div className="grid size-7 place-items-center rounded-md bg-primary/10 text-primary">
                  <Sparkles className="size-3.5" />
                </div>
                <div className="leading-tight">
                  <p className="text-[13px] font-semibold">Medi Prompt</p>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-success">
                    <span className="mr-1 inline-block size-1.5 translate-y-[-1px] rounded-full bg-success align-middle" />
                    Demo · Online
                  </p>
                </div>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Session #DM-2918
              </span>
            </header>

            <div ref={scrollerRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-6">
              {messages.length === 0 && (
                <div className="space-y-4">
                  <Bubble role="assistant">
                    Hello — I&apos;m Medi Prompt, the AI clinical assistant. Try the demo: ask me about the
                    platform, or describe a symptom you&apos;d like to walk through.
                  </Bubble>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => onSubmit(s)}
                        className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground transition hover:border-primary/30 hover:bg-primary-soft hover:text-foreground"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((m) => (
                <Bubble key={m.id} role={m.role}>
                  {m.text}
                </Bubble>
              ))}
              {loading && (
                <Bubble role="assistant">
                  <span className="inline-flex gap-1">
                    <Dot delay={0} />
                    <Dot delay={120} />
                    <Dot delay={240} />
                  </span>
                </Bubble>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit(input);
              }}
              className="border-t border-border bg-background p-3"
            >
              <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/15">
                <span className="font-mono text-xs text-muted-foreground">/</span>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Describe a symptom or ask about the platform…"
                  disabled={loading}
                  className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground/70 focus:outline-none disabled:opacity-50"
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={loading || !input.trim()}
                  className="h-7 rounded-md px-2.5"
                >
                  <ArrowUpRight className="size-3.5" />
                </Button>
              </div>
              <p className="mt-2 flex items-center gap-1.5 px-1 text-[10px] text-muted-foreground">
                <ShieldCheck className="size-3 text-success" />
                Demo only — no diagnosis or treatment is provided.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-mono text-2xl font-semibold tracking-tight text-foreground">{value}</p>
      <p className="mt-1 text-xs leading-snug text-muted-foreground">{label}</p>
    </div>
  );
}

function Bubble({ role, children }: { role: "user" | "assistant"; children: React.ReactNode }) {
  if (role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-3.5 py-2.5 text-sm leading-relaxed text-primary-foreground shadow-sm">
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className="flex gap-2.5">
      <div className="mt-1 grid size-6 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
        <Sparkles className="size-3" />
      </div>
      <div className="max-w-[88%] rounded-2xl rounded-tl-sm border border-border bg-surface px-3.5 py-2.5 text-sm leading-relaxed text-foreground">
        {children}
      </div>
    </div>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <span
      className="inline-block size-1.5 rounded-full bg-muted-foreground/60 animate-pulse-dot"
      style={{ animationDelay: `${delay}ms` }}
    />
  );
}
