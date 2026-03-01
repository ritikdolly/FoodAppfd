import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { RevealSection } from "./RevealSection";

export const AboutCta = () => {
  return (
    <RevealSection
      className="relative overflow-hidden bg-gradient-to-r from-[#FF4B2B] to-[#FF416C] py-20"
      direction="up"
    >
      {/* Decorative circles — floating */}
      <div className="absolute -top-1/2 -right-[10%] w-96 h-96 bg-white/[0.07] rounded-full animate-float-slow" />
      <div className="absolute -bottom-1/3 -left-[5%] w-72 h-72 bg-white/[0.05] rounded-full animate-float-delayed" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center stagger-children">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Ready to Experience the Best?
        </h2>
        <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
          Join us for an unforgettable dining experience. Reserve your table
          today and let us take care of the rest.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 bg-white text-[#FF4B2B] px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:scale-105 transition-all duration-300 text-lg animate-bounce-subtle"
          >
            Reserve a Table
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 border-2 border-white/40 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 hover:scale-105 transition-all duration-300 text-lg"
          >
            View Menu
          </Link>
        </div>
      </div>
    </RevealSection>
  );
};
