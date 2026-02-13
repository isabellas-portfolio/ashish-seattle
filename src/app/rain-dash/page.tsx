import RainDashGame from "@/components/RainDashGame";
import Link from "next/link";

export default function RainDashPage() {
  return (
    <main className="min-h-screen bg-white px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-[480px] flex flex-col items-center">
        <Link
          href="/"
          className="inline-block mb-6 rounded-full border border-[#C8DBEE] bg-white/80 px-4 py-2 text-sm font-medium text-[#2A3D66] hover:bg-white transition self-start"
        >
          ← Back to the guide
        </Link>

        <div className="text-center mb-8 w-full">
          <h1 className="text-3xl font-bold text-[#2A3D66] sm:text-4xl">
            Seattle Rain Dash
          </h1>
          <p className="mt-2 text-sm text-[#2A3D66]/70 font-mono">
            Avoid 🌧️ 🕳️ • Collect ☕ 💙
          </p>
        </div>

        <div className="relative rounded-xl w-full flex flex-col items-center">
          <RainDashGame />
        </div>
      </div>
    </main>
  );
}
