import type { Metadata } from "next";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { HeroChat } from "@/components/landing/hero-chat";
import { HowItWorks, Features, DoctorCTA, FAQ } from "@/components/landing/sections";

export const metadata: Metadata = {
  title: "Medi Prompt — Your AI Clinical Assistant",
  description:
    "Reduce consultation time and improve patient care. AI clinical co-pilot for doctors, reviewed by a licensed physician before reaching the patient.",
};

// Public landing page: nav, hero demo, marketing sections and footer.
export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>
        <HeroChat />
        <HowItWorks />
        <Features />
        <DoctorCTA />
        <FAQ />
      </main>
      <SiteFooter />
    </div>
  );
}
