
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';

export function LandingPage() {
  return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <Hero />
        <Features />
      </div>
  );
}


