import { X, Heart, MapPin, User } from "lucide-react";

export const MobileDrawer = ({ open, onClose, links }) => (
  <>
    <div
      className={`fixed inset-0 bg-black/50 z-[60] md:hidden
      ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      onClick={onClose}
    />

    <div
      className={`fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white z-[70]
      transition-transform duration-300 md:hidden
      ${open ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="p-5 flex justify-between border-b">
        <span className="font-bold">Menu</span>
        <button onClick={onClose}><X /></button>
      </div>

      <div className="p-4 space-y-4">
        {links.map(l => (
          <a key={l.name} href={l.href} className="block px-4 py-3 rounded-lg hover:bg-gray-50">
            {l.name}
          </a>
        ))}

        <div className="border-t pt-4 space-y-2">
          <div className="flex gap-3 px-4 py-2"><Heart /> Favorites</div>
          <div className="flex gap-3 px-4 py-2"><MapPin /> Addresses</div>
          <div className="flex gap-3 px-4 py-2"><User /> Profile</div>
        </div>
      </div>
    </div>
  </>
);
