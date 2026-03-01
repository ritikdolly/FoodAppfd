import { Users, Quote } from "lucide-react";
import { WEBSITE_NAME } from "../../constants";
import { yearsOfExperience } from "./aboutConstants";
import { RevealSection } from "./RevealSection";

export const MeetOwner = () => {
  return (
    <RevealSection
      className="bg-gradient-to-b from-gray-50/50 to-white py-20"
      direction="scale"
    >
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-orange-50 to-red-50 text-[#FF4B2B] rounded-full text-xs font-bold uppercase tracking-widest">
            <Users className="w-3.5 h-3.5" />
            Meet the Owner
          </span>
        </div>

        <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl p-8 md:p-12 hover:shadow-2xl hover:-translate-y-1 transition-all duration-400">
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10 items-center">
            {/* Owner Photo */}
            <div className="flex flex-col items-center">
              <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-white shadow-lg shadow-[#FF4B2B]/10 hover:scale-105 transition-transform duration-300 animate-pulse-glow">
                <img
                  src="/owner.jpg"
                  alt="Nand Kishor Prajapati"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.classList.add(
                      "bg-gradient-to-br",
                      "from-[#FF4B2B]/10",
                      "to-[#FF416C]/10",
                      "flex",
                      "items-center",
                      "justify-center",
                    );
                    const icon = document.createElement("div");
                    icon.innerHTML =
                      '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-[#FF4B2B]/60"><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/><line x1="6" x2="18" y1="17" y2="17"/></svg>';
                    e.target.parentElement.appendChild(icon);
                  }}
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mt-4">
                Nand Kishor Prajapati
              </h3>
              <p className="text-sm text-[#FF4B2B] font-medium">
                Founder & Head Chef
              </p>
            </div>

            {/* Bio */}
            <div className="space-y-4 stagger-children">
              <div className="flex items-start gap-3">
                <Quote className="w-8 h-8 text-[#FF4B2B]/30 shrink-0 mt-1" />
                <p className="text-gray-600 leading-relaxed italic">
                  "Every dish we serve carries a piece of our heart. I started
                  this restaurant with a simple belief — that good food has the
                  power to bring people together. From our family kitchen in
                  Jharkhand to your table, we pour love into every recipe."
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <p className="text-gray-600 text-sm leading-relaxed">
                  With over{" "}
                  <strong>{yearsOfExperience}+ years of experience</strong> in
                  the food and hospitality industry, Nand Kishor Prajapati has
                  honed his craft across multiple kitchens before founding{" "}
                  {WEBSITE_NAME}. A graduate of the Institute of Hotel
                  Management, his passion lies in preserving traditional recipes
                  while adding a contemporary twist.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Under his leadership, the restaurant has earned a reputation
                  for{" "}
                  <strong>
                    consistent quality, warm hospitality, and innovative menu
                    offerings
                  </strong>{" "}
                  that keep guests coming back for more.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  );
};
