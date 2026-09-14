import Hero from "@/components/Hero";
import LiveMarketTicker from "@/components/LiveMarketTicker";
import MarqueeBanner from "@/components/MarqueeBanner";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <LiveMarketTicker />
      <MarqueeBanner />
      <About />
      <Testimonials />
    </div>
  );
}

