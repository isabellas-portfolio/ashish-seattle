import Hero from "@/components/Hero";
import RecGrid from "@/components/RecGrid";
import Checklist from "@/components/Checklist";
import Countdown from "@/components/Countdown";
import OpenWhenLetters from "@/components/OpenWhenLetters";
import TopNav from "@/components/TopNav";
import BackToTop from "@/components/BackToTop";
import LoveBoost from "@/components/LoveBoost";
import MarginDoodles from "@/components/MarginDoodles";
import { openWhenLetterNotes } from "@/data/openWhenLetters";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <MarginDoodles />
      <main className="relative z-10 min-h-screen mx-auto max-w-6xl px-4 pt-2 pb-12 md:px-6 md:pt-4 md:pb-16">
      <div className="min-h-screen flex flex-col">
        <TopNav />
        <Hero />
      </div>

      <div className="mt-16 space-y-20 md:mt-24">
        <section id="seattle">
          <RecGrid />
        </section>
        <section id="dates">
          <Checklist />
        </section>
        <Countdown />
        <section id="letters">
          <OpenWhenLetters notes={openWhenLetterNotes} />
        </section>
      </div>

      <footer className="mt-24 border-t border-coastal-soft pt-8 pb-6 text-center">
        <p className="text-sm text-gray-500"> © 2026 Vibe Coded by Bella {"<3"}</p>
      </footer>
      <BackToTop />
      <LoveBoost />
      </main>
    </div>
  );
}
