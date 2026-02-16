import { UtensilsCrossed } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { WEBSITE_FIRST_NAME, WEBSITE_SECOND_NAME, WEBSITE_THIRD_NAME, WEBSITE_SHORT_NAME } from "../../constants";

export const Logo = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/")}
      className="flex items-center gap-2 cursor-pointer group"
    >
      <div className="bg-[#FF4B2B] p-2 rounded-xl transition-transform group-hover:scale-110 shadow-lg shadow-orange-500/30">
        <UtensilsCrossed className="w-6 h-6 text-white" />
      </div>

      <span className="hidden sm:block text-2xl font-bold text-[#2D3436] tracking-tight hover:text-[#FF4B2B] transition-colors">
        {WEBSITE_FIRST_NAME}<span className="text-[#FF4B2B]">{WEBSITE_SECOND_NAME}</span>{WEBSITE_THIRD_NAME}
      </span>

      <span className="sm:hidden text-xl font-bold text-[#FF4B2B]">{WEBSITE_SHORT_NAME}</span>
    </div>
  );
};
