import { Search } from "lucide-react";

export const SearchBar = ({ focused, onFocus, onBlur }) => (
  <div className={`hidden md:flex flex-1 max-w-md ${focused ? "scale-[1.02]" : ""}`}>
    <div className={`flex items-center w-full bg-gray-100 rounded-full border transition
      ${focused ? "border-orange-500 ring-2 ring-orange-100 bg-white" : "border-transparent"}`}>
      <Search className="w-5 h-5 ml-4 text-gray-400" />
      <input
        type="text"
        placeholder="Search for food, coffee..."
        className="w-full bg-transparent px-4 py-2.5 text-sm outline-none"
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  </div>
);
