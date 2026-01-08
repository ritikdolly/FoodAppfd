import { UtensilsCrossed } from "lucide-react";

export const Logo = () => (
  <div className="flex items-center gap-2 cursor-pointer">
    <div className="bg-orange-500 p-1.5 rounded-lg">
      <UtensilsCrossed className="w-6 h-6 text-white" />
    </div>
    <span className="hidden sm:block text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-500">
      Prajapati Line Hotel Tulbull
    </span>
    <span className="sm:hidden text-lg font-bold text-orange-600">
      PLH
    </span>
  </div>
);
