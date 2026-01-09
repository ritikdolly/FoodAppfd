import { MapPin, Phone, Mail } from "lucide-react";

export const FooterContact = () => {
  return (
    <div>
      <h3 className="text-white font-semibold text-lg mb-6">Contact Us</h3>
      <ul className="space-y-4 text-sm">
        <li className="flex gap-3">
          <MapPin className="w-5 h-5 text-orange-500 shrink-0" />
          <span>
            123 Foodie Street, Culinary District <br />
            New York, NY 10001
          </span>
        </li>
        <li className="flex gap-3">
          <Phone className="w-5 h-5 text-orange-500 shrink-0" />
          <span>+1 (555) 123-4567</span>
        </li>
        <li className="flex gap-3">
          <Mail className="w-5 h-5 text-orange-500 shrink-0" />
          <span>support@prajapatilinehotel.com</span>
        </li>
      </ul>
    </div>
  );
};
