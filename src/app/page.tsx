import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import FeaturesGrid from "@/components/landing/FeaturesGrid";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturesGrid />
      <footer className="border-t border-gray-100 bg-white px-6 py-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-xs text-gray-400">
          <span>© 2026 AI Support. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-600 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-gray-600 transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-gray-600 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
