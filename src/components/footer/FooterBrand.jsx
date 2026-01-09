import { UtensilsCrossed, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export const FooterBrand = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="bg-orange-600 p-2 rounded-lg">
          <UtensilsCrossed className="w-6 h-6 text-white" />
        </div>
        <span className="text-2xl font-bold text-white">
          Prajapati Line Hotel Tulbull
        </span>
      </div>

      <p className="text-sm leading-relaxed text-gray-400">
        Satisfying your cravings, one delivery at a time. Fresh food from top local restaurants, straight to your door.
      </p>

      <div className="flex items-center gap-4">
        {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
          <a
            key={i}
            href="#"
            className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-600 hover:text-white transition"
          >
            <Icon className="w-5 h-5" />
          </a>
        ))}
      </div>
    </div>
  );
};
