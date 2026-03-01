import { Utensils } from "lucide-react";
import { WEBSITE_NAME } from "../../constants";
import { ESTABLISHED_YEAR } from "./aboutConstants";
import { RevealSection } from "./RevealSection";

export const OurStory = () => {
  return (
    <RevealSection className="max-w-7xl mx-auto px-4 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text — slides in from left */}
        <div className="space-y-6 animate-slide-in-left">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-orange-50 to-red-50 text-[#FF4B2B] rounded-full text-xs font-bold uppercase tracking-widest">
            <Utensils className="w-3.5 h-3.5" />
            Our Story
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            A Legacy of Flavor,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4B2B] to-[#FF416C]">
              Crafted with Love
            </span>
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Founded in <strong>{ESTABLISHED_YEAR}</strong>, {WEBSITE_NAME} began
            as a humble family kitchen with a big dream — to bring the rich,
            authentic flavors of Indian cuisine to every table. Inspired by
            generations of home-cooked recipes from the heartland of Jharkhand,
            our restaurant has grown into a beloved dining destination.
          </p>

          <p className="text-gray-600 leading-relaxed">
            We specialize in a wide spectrum of{" "}
            <strong>
              North Indian, South Indian, and Indo-Chinese cuisine
            </strong>
            , from aromatic biryanis and creamy curries to sizzling tandoori
            platters and freshly baked naan. Every dish tells a story of
            tradition meeting innovation.
          </p>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 stagger-children">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-orange-50 to-white border border-orange-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF4B2B]" />
                Our Mission
              </h3>
              <p className="text-sm text-gray-600">
                To serve fresh, flavorful food that celebrates India's culinary
                heritage — making every meal a memorable experience.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-gradient-to-br from-red-50 to-white border border-red-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF416C]" />
                Our Vision
              </h3>
              <p className="text-sm text-gray-600">
                To become the most loved restaurant brand in Jharkhand, known
                for quality, warmth, and community spirit.
              </p>
            </div>
          </div>
        </div>

        {/* Image — slides in from right */}
        <div className="relative group animate-slide-in-right">
          <div className="rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500">
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80"
              alt="Inside Prajapati Line Hotel restaurant"
              className="w-full h-[450px] object-cover"
              loading="lazy"
            />
          </div>
          {/* Decorative blobs — floating */}
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#FF416C]/15 rounded-full blur-3xl -z-10 animate-float" />
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#FF4B2B]/15 rounded-full blur-3xl -z-10 animate-float-delayed" />
        </div>
      </div>
    </RevealSection>
  );
};
