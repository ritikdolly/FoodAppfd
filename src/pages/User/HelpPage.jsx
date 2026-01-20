import {
  Mail,
  MessageCircle,
  Phone,
  HelpCircle,
  ChevronRight,
  FileText,
} from "lucide-react";
import { Button } from "../../components/ui/Button";

export const HelpPage = () => {
  const faqs = [
    "How can I track my order?",
    "What is the refund policy?",
    "How to change my delivery address?",
    "Payment methods accepted",
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-[#FF4B2B] to-[#FF416C] mb-2">
        Help & Support
      </h1>
      <p className="text-gray-500 mb-8">How can we help you today?</p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Options */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Contact Us</h2>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 cursor-pointer hover:shadow-md transition">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Chat with Support</h3>
              <p className="text-sm text-gray-500">Average wait time 2 mins</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 cursor-pointer hover:shadow-md transition">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Call Us</h3>
              <p className="text-sm text-gray-500">Available 9 AM - 9 PM</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 cursor-pointer hover:shadow-md transition">
            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Email Support</h3>
              <p className="text-sm text-gray-500">
                Get a response within 24hrs
              </p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Common Questions
          </h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition"
              >
                <span className="text-gray-700 font-medium flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-gray-400" />
                  {faq}
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            ))}
            <div className="p-4 bg-gray-50 rounded-b-2xl">
              <Button variant="ghost" className="w-full text-[#FF4B2B]">
                View All FAQs
              </Button>
            </div>
          </div>

          <div className="mt-6 bg-orange-50 rounded-2xl p-6 border border-orange-100">
            <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#FF4B2B]" /> Legal
            </h3>
            <div className="flex gap-4 text-sm text-gray-600">
              <a href="#" className="hover:underline">
                Terms of Service
              </a>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
