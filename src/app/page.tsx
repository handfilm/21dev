import ScarcityEngine from "@/components/ScarcityEngine";
import HeroSection from "@/components/HeroSection";
import AnatomySection from "@/components/AnatomySection";
import FitQuiz from "@/components/FitQuiz";

export default function Home() {
  return (
    <>
      <ScarcityEngine />
      {/* pt-10 offsets the fixed ScarcityEngine banner (h-10) above */}
      <main className="min-h-screen bg-black pt-10">
        <HeroSection />
        <AnatomySection />
        <FitQuiz />
      </main>
    </>
  );
}
