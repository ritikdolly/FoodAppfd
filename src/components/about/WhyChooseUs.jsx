import { Leaf, ChefHat, Sofa, Heart, Star } from "lucide-react";
import { useReveal } from "./useReveal";

const features = [
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    desc: "We source the freshest, locally-grown ingredients daily to ensure every dish bursts with natural flavors and nutrition.",
  },
  {
    icon: ChefHat,
    title: "Experienced Chefs",
    desc: "Our talented culinary team brings decades of combined experience, crafting each plate with passion and precision.",
  },
  {
    icon: Sofa,
    title: "Cozy Atmosphere",
    desc: "Enjoy a warm, inviting ambiance designed for unforgettable dining moments — perfect for families and celebrations.",
  },
  {
    icon: Heart,
    title: "Customer Satisfaction",
    desc: "Your happiness is our top priority. We go above and beyond to deliver an exceptional experience every single visit.",
  },
];

// Individual animated card
const FeatureCard = ({ feature, index }) => {
  const FeatureIcon = feature.icon;
  const ref = useReveal({ direction: "up", delay: index * 150 });

  return (
    <div
      ref={ref}
      className="group bg-white rounded-2xl p-7 border border-gray-100 relative overflow-hidden hover:-translate-y-2 hover:shadow-xl hover:shadow-black/[0.04] transition-all duration-400"
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF4B2B] to-[#FF416C] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400" />

      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center mb-5 text-[#FF4B2B] group-hover:bg-gradient-to-br group-hover:from-[#FF4B2B] group-hover:to-[#FF416C] group-hover:text-white group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
        <FeatureIcon className="w-7 h-7" />
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
    </div>
  );
};

export const WhyChooseUs = () => {
  const sectionRef = useReveal();

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-b from-gray-50/50 to-white py-20"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-orange-50 to-red-50 text-[#FF4B2B] rounded-full text-xs font-bold uppercase tracking-widest">
            <Star className="w-3.5 h-3.5" />
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">
            What Makes Us Special
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            We don't just serve food — we create experiences that keep you
            coming back for more.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
