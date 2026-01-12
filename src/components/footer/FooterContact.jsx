import { MapPin, Phone, Mail } from "lucide-react";

export const FooterContact = () => {
  return (
    <div>
      <h3 className="text-white font-semibold text-lg mb-6">Contact Us</h3>
      <ul className="space-y-4 text-sm">
        <li className="flex gap-3">
          <MapPin className="w-5 h-5 text-orange-500 shrink-0" />
          <span>
            Prajapati Line Hotel Tulbul, Main Road Lalpania Dist: Boakro (JH) <br />
            India, 829111
          </span>
        </li>
        <li className="flex gap-3">
          <Phone className="w-5 h-5 text-orange-500 shrink-0" />
          <span>+91 9798904589</span>
        </li>
        <li className="flex gap-3">
          <Mail className="w-5 h-5 text-orange-500 shrink-0" />
          <span>support@prajapatilinehotel.com</span>
        </li>
      </ul>
    </div>
  );
};
