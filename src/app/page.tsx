import ScarcityEngine from "@/components/ScarcityEngine";
import HeroSection from "@/components/HeroSection";
import ManifestoReveal from "@/components/ManifestoReveal";
import AuthenticityCard from "@/components/AuthenticityCard";
import LifestyleMarquee from "@/components/LifestyleMarquee";
import AnatomySection from "@/components/AnatomySection";
import BentoShowcase from "@/components/BentoShowcase";
import FitQuiz from "@/components/FitQuiz";

export default function Home() {
  return (
    <>
      <ScarcityEngine />
      {/* pt-10 offsets the fixed ScarcityEngine banner (h-10) above */}
      <main className="min-h-screen bg-black pt-10">
        <HeroSection />
        <ManifestoReveal />
        <AuthenticityCard />
        <LifestyleMarquee />
        <AnatomySection />
        <BentoShowcase />
        <FitQuiz />
      </main>
    </>
  );
}
