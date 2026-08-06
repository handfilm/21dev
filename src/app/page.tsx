import HeroSection from "@/components/HeroSection";
import OrbitingCirclesGlobe from "@/components/ui/orbiting-circles-02";
import BentoShowcase from "@/components/BentoShowcase"; // নতুন ইম্পোর্ট

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      
      <section className="relative w-full border-b bg-background py-20">
        <div className="mx-auto max-w-6xl px-6 text-center mb-16">
          <h2 className="text-fluid-3xl font-semibold text-balance">
            Powered by modern architecture
          </h2>
        </div>
        <OrbitingCirclesGlobe />
      </section>

      {/* নতুন বেন্টো গ্রিড শোকেস */}
      <BentoShowcase />

    </main>
  );
}