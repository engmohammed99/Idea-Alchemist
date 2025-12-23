import { HeroSection } from "@/components/hero-section";
import { MeshBackground } from "@/components/ui/mesh-background";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <MeshBackground />
      <HeroSection />
    </main>
  );
}
