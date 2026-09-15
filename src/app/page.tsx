import Hero from "@/components/Hero";
import LiveMarketTicker from "@/components/LiveMarketTicker";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <LiveMarketTicker />
      <About />
      <Testimonials />
    </div>
  );
}

