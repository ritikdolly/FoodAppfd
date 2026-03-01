import { MapPin, Phone, Mail, Clock } from "lucide-react";
import {
  WEBSITE_EMAIL,
  WEBSITE_PHONE,
  WEBSITE_FIRST_ADDRESS_LINE,
  WEBSITE_SECOND_ADDRESS_LINE,
  WEBSITE_THIRD_ADDRESS_LINE,
} from "../../constants";
import { RevealSection } from "./RevealSection";
import { useReveal } from "./useReveal";

const hours = [
  { day: "Monday – Friday", time: "10:00 AM – 10:00 PM" },
  { day: "Saturday", time: "9:00 AM – 11:00 PM" },
  { day: "Sunday", time: "9:00 AM – 10:00 PM" },
];

export const LocationContact = () => {
  const mapRef = useReveal({ direction: "left", delay: 100 });
  const cardRef = useReveal({ direction: "right", delay: 250 });

  return (
    <RevealSection className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-orange-50 to-red-50 text-[#FF4B2B] rounded-full text-xs font-bold uppercase tracking-widest">
          <MapPin className="w-3.5 h-3.5" />
          Visit Us
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">
          Find Us Here
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Map — slides in from left */}
        <div
          ref={mapRef}
          className="rounded-2xl overflow-hidden border-2 border-gray-100 shadow-lg bg-gray-50 min-h-[320px] flex items-center justify-center hover:shadow-xl transition-shadow duration-300"
        >
          <iframe
            title="Restaurant Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.0932476914304!2d85.75989907479287!3d23.77969358765214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f46708b2d774f3%3A0x217acba1fdfdf4f1!2sPrajapati%20Line%20Hotel%20Tulbul!5e0!3m2!1sen!2sin!4v1772393628198!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: "320px" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        </div>

        {/* Contact Card — slides in from right */}
        <div
          ref={cardRef}
          className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-xl p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-400"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Contact Information
          </h3>

          <div className="space-y-5 stagger-children">
            {/* Address */}
            <div className="flex items-start gap-4 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200">
                <MapPin className="w-5 h-5 text-[#FF4B2B]" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Address</p>
                <p className="text-gray-600 text-sm mt-0.5">
                  {WEBSITE_FIRST_ADDRESS_LINE}
                  <br />
                  {WEBSITE_SECOND_ADDRESS_LINE}
                  <br />
                  {WEBSITE_THIRD_ADDRESS_LINE}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200">
                <Phone className="w-5 h-5 text-[#FF4B2B]" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Phone</p>
                <a
                  href={`tel:${WEBSITE_PHONE}`}
                  className="text-gray-600 text-sm hover:text-[#FF4B2B] transition-colors mt-0.5 block"
                >
                  {WEBSITE_PHONE}
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200">
                <Mail className="w-5 h-5 text-[#FF4B2B]" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Email</p>
                <a
                  href={`mailto:${WEBSITE_EMAIL}`}
                  className="text-gray-600 text-sm hover:text-[#FF4B2B] transition-colors mt-0.5 block break-all"
                >
                  {WEBSITE_EMAIL}
                </a>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="flex items-start gap-4 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200">
                <Clock className="w-5 h-5 text-[#FF4B2B]" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm mb-2 flex items-center gap-2">
                  Opening Hours
                  <span className="inline-flex items-center gap-1.5 text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Open Now
                  </span>
                </p>
                <table className="w-full">
                  <tbody>
                    {hours.map(({ day, time }) => (
                      <tr
                        key={day}
                        className="border-b border-gray-50 last:border-0"
                      >
                        <td className="py-1.5 text-sm font-medium text-gray-700">
                          {day}
                        </td>
                        <td className="py-1.5 text-sm text-gray-500 text-right">
                          {time}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  );
};
