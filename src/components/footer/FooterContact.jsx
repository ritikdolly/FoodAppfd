import { MapPin, Phone, Mail } from "lucide-react";
import { WEBSITE_EMAIL, WEBSITE_FIRST_ADDRESS_LINE, WEBSITE_PHONE, WEBSITE_SECOND_ADDRESS_LINE, WEBSITE_THIRD_ADDRESS_LINE } from "../../constants";

export const FooterContact = () => {
  return (
    <div>
      <h3 className="text-white font-semibold text-lg mb-6">Contact Us</h3>
      <ul className="space-y-4 text-sm">
        <li className="flex gap-3">
          <MapPin className="w-5 h-5 text-orange-500 shrink-0" />
          <span>
            {WEBSITE_FIRST_ADDRESS_LINE} <br />
            {WEBSITE_SECOND_ADDRESS_LINE} <br />
            {WEBSITE_THIRD_ADDRESS_LINE}
          </span>
        </li>
        <li className="flex gap-3">
          <Phone className="w-5 h-5 text-orange-500 shrink-0" />
          <span>{WEBSITE_PHONE}</span>
        </li>
        <li className="flex gap-3">
          <Mail className="w-5 h-5 text-orange-500 shrink-0" />
          <span>{WEBSITE_EMAIL}</span>
        </li>
      </ul>
    </div>
  );
};
