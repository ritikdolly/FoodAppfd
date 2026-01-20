import { Search, Bell, LogOut, Menu } from "lucide-react";

export const AdminHeader = ({ onMenuClick }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-gray-200/50 px-4 md:px-8 py-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Search Bar - Optional enhancement */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg text-gray-500 w-64 border border-transparent focus-within:border-[#FF4B2B]/50 focus-within:bg-white transition-all">
          <Search className="w-4 h-4" />
          <input
            placeholder="Search..."
            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
        </button>

        <div className="h-6 w-px bg-gray-200"></div>

        <button className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm font-medium px-3 py-1.5 hover:bg-red-50 rounded-lg transition-colors group">
          <LogOut className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Logout
        </button>
      </div>
    </header>
  );
};
