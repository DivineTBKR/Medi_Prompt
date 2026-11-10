import Link from "next/link";
import {
  Activity,
  Brain,
  ClipboardCheck,
  FileText,
  FlaskConical,
  Heart,
  Languages,
  Mic,
  Pill,
  ScanLine,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

const STEPS = [
  { title: "Secure sign-in", body: "Patients and clinicians access the platform through a private, encrypted space." },
  { title: "Guided intake", body: "A calm, conversational assistant gathers context at the patient's pace." },
  { title: "Symptom exploration", body: "Adaptive questions build a clear picture of what's going on." },
  { title: "Structured summary", body: "Key findings are organized into a clean, easy-to-read overview." },
  { title: "Clinician review", body: "A licensed professional reads the summary and adds their judgment." },
  { title: "Shared understanding", body: "Patient and clinician see the same clear information side by side." },
  { title: "Care plan", body: "Next steps, guidance, or prescriptions — reviewed and signed by a doctor." },
  { title: "Follow-up", body: "Gentle check-ins keep everyone informed as things evolve." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-border bg-surface py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">
            01 · Workflow
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            A calm, guided path — for both sides of the visit.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Medi Prompt brings patients and clinicians into a shared, unhurried space. The assistant
            handles the groundwork; people stay in charge of the care.
          </p>
        </div>

        <ol className="relative mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              className="group relative flex flex-col gap-3 bg-background p-6 transition hover:bg-primary-soft/40"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tracking-widest text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="h-px flex-1 mx-3 bg-border" />
                <span className="grid size-7 place-items-center rounded-full bg-primary/10 text-primary text-[11px] font-semibold">
                  {i + 1}
                </span>
              </div>
              <div>
                <p className="font-medium text-foreground">{s.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const FEATURES = [
  {
    icon: Brain,
    title: "Adaptive AI interview",
    body: "Symptom-aware questioning that branches into cardiac, GI, dermatology, neuro pathways.",
  },
  {
    icon: ClipboardCheck,
    title: "Differential diagnosis",
    body: "Ranked conditions with confidence, severity, ICD-10 / SNOMED, supporting references.",
  },
  {
    icon: Pill,
    title: "Prescription drafting",
    body: "Autocomplete medication, dose calc, repeat protocols, electronic signature.",
  },
  {
    icon: ShieldCheck,
    title: "Interaction & allergy checks",
    body: "Real-time contraindication and drug-drug interaction screening.",
  },
  {
    icon: FlaskConical,
    title: "Lab & imaging suggestions",
    body: "Evidence-based test ordering with reference ranges and cost awareness.",
  },
  {
    icon: Heart,
    title: "Emergency detection",
    body: "Red-flag triggers stop the consult and route to immediate care.",
  },
  {
    icon: FileText,
    title: "SOAP & clinical summaries",
    body: "Auto-generated visit summaries, sick leave certificates, referrals.",
  },
  {
    icon: Activity,
    title: "FHIR & EHR integration",
    body: "Native sync with Epic, Cerner, Athena. Bi-directional updates.",
  },
  {
    icon: Mic,
    title: "Voice & ambient",
    body: "Speech-to-text, text-to-speech, ambient scribe during the visit.",
  },
  {
    icon: ScanLine,
    title: "Medical OCR",
    body: "Prescription scanner, lab reader, image uploads with AI analysis.",
  },
  {
    icon: Languages,
    title: "Multi-language",
    body: "Conduct intake in the patient's preferred language, output in clinical English.",
  },
  {
    icon: Stethoscope,
    title: "Doctor-in-the-loop",
    body: "Every recommendation reviewed and signed by a licensed physician.",
  },
];

export function Features() {
  return (
    <section id="features" className="border-b border-border py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-widest text-primary">
              02 · Capabilities
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              The full clinical surface.
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            Twelve focused capabilities, one calm interface. Built for the rigor of medicine.
          </p>
        </div>
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group relative bg-background p-7 transition hover:bg-surface"
            >
              <div className="grid size-10 place-items-center rounded-lg bg-primary/8 text-primary ring-1 ring-primary/10">
                <f.icon className="size-5" />
              </div>
              <h3 className="mt-5 font-medium tracking-tight">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DoctorCTA() {
  return (
    <section id="for-doctors" className="border-b border-border bg-surface py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 sm:px-12 sm:py-20">
          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-primary-foreground/70">
              03 · For clinicians
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-primary-foreground sm:text-4xl">
              Bring Medi Prompt to your practice.
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80">
              Join the clinicians using AI-assisted intake to save time, reduce documentation, and keep every patient decision in your hands.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="inline-flex h-11 items-center justify-center rounded-lg bg-background px-6 text-sm font-medium text-primary shadow-sm transition hover:bg-background/90"
              >
                Apply as a clinician
              </Link>
              <Link
                href="/login"
                className="inline-flex h-11 items-center justify-center rounded-lg border border-primary-foreground/20 bg-transparent px-6 text-sm font-medium text-primary-foreground transition hover:bg-primary-foreground/10"
              >
                Sign in
              </Link>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 opacity-10" aria-hidden>
            <div className="absolute -right-24 -top-24 size-96 rounded-full bg-primary-foreground/30 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 size-80 rounded-full bg-primary-foreground/20 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  {
    q: "Is patient data used to train your models?",
    a: "No. Patient data is strictly siloed per clinic, never used in foundational training, and processed under signed BAAs with zero-retention defaults.",
  },
  {
    q: "How does the doctor stay in control?",
    a: "Every AI output — differential, prescription, referral — is a draft. A licensed physician reviews, edits and electronically signs before anything reaches the patient.",
  },
  {
    q: "Which EHR systems do you support?",
    a: "We use SMART on FHIR for bi-directional sync with Epic, Cerner and Athena. Custom integrations available on Hospital and Enterprise plans.",
  },
  {
    q: "What happens in an emergency?",
    a: "Red-flag symptoms (chest pain pattern, stroke signs, suicidal ideation, etc.) immediately halt the intake, surface emergency guidance, and notify the assigned doctor as Critical.",
  },
  {
    q: "Where is data stored?",
    a: "EU-region storage by default with regional residency options. All data is encrypted at rest (AES-256) and in transit (TLS 1.3).",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="border-b border-border py-24">
      <div className="mx-auto max-w-3xl px-6">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">03 · FAQ</p>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight">Common questions.</h2>
        <div className="mt-10 divide-y divide-border border-y border-border">
          {FAQS.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base font-medium">
                {f.q}
                <span className="grid size-6 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition group-open:rotate-45 group-open:border-primary group-open:text-primary">
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
