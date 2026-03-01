import { Utensils, Star, Users, ChefHat } from "lucide-react";
import { WEBSITE_NAME } from "../../constants";
import { ESTABLISHED_YEAR } from "./aboutConstants";

export const AboutHero = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
      {/* Background image overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-[10%] w-20 h-20 rounded-full bg-[#FF4B2B]/10 blur-xl animate-float" />
      <div className="absolute top-40 right-[15%] w-32 h-32 rounded-full bg-[#FF416C]/8 blur-2xl animate-float-delayed" />
      <div className="absolute bottom-32 left-[20%] w-16 h-16 rounded-full bg-white/5 blur-lg animate-float-slow" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 py-20 max-w-4xl mx-auto">
        <span className="animate-hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-6">
          <Utensils className="w-4 h-4" />
          Est. {ESTABLISHED_YEAR} • Authentic Indian Cuisine
        </span>

        <h1 className="animate-hero-text text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
          About{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4B2B] to-[#FF416C]">
            {WEBSITE_NAME}
          </span>
        </h1>

        <p className="animate-hero-subtitle text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10">
          A culinary journey rooted in tradition, passion, and the finest
          flavors of India — served with love since {ESTABLISHED_YEAR}.
        </p>

        <div className="animate-hero-stats flex flex-wrap justify-center gap-8 text-white/80">
          {[
            { icon: Star, label: "4.8 Rating" },
            { icon: Users, label: "50K+ Served" },
            { icon: ChefHat, label: "15+ Chefs" },
          ].map((item) => {
            const StatIcon = item.icon;
            return (
              <div
                key={item.label}
                className="flex items-center gap-2 text-sm font-medium hover:text-white hover:scale-110 transition-all duration-300"
              >
                <StatIcon className="w-5 h-5 text-[#FF4B2B]" />
                {item.label}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" className="w-full h-auto">
          <path
            fill="white"
            d="M0,64L80,58.7C160,53,320,43,480,42.7C640,43,800,53,960,56C1120,59,1280,53,1360,50.7L1440,48L1440,80L1360,80C1280,80,1120,80,960,80C800,80,640,80,480,80C320,80,160,80,80,80L0,80Z"
          />
        </svg>
      </div>
    </section>
  );
};
