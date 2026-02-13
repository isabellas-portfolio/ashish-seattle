import StarterKitGame from "@/components/StarterKitGame";
import Link from "next/link";

export default function StarterKitPage() {
  return (
    <main className="min-h-screen bg-[#F4F8FC] px-6 py-16">
      <div className="mx-auto max-w-[1000px]">
        {/* Back button */}
        <Link
          href="/"
          className="inline-block mb-8 rounded-full border border-[#C8DBEE]
                     bg-white/70 px-4 py-2 text-sm font-medium text-[#2A3D66]
                     hover:bg-white transition"
        >
          ← Back to the guide
        </Link>

        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-[#2A3D66]">
            Seattle Starter Kit 🧳
          </h1>
          <p className="mt-3 text-[#2A3D66]/70">
            Consider this your survival test.
          </p>
        </div>

        <StarterKitGame />
      </div>
    </main>
  );
}
