import { useState, useEffect } from "react";
import { X, Code2, ExternalLink } from "lucide-react";
import { WEBSITE_NAME } from "../../constants";
import {
  DEVELOPER_NAME,
  DEVELOPER_SHORT_NAME,
  DEVELOPER_ROLE,
  DEVELOPER_GITHUB,
} from "../../developer";

export const DemoDisclaimer = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show popup on every page load
    const timer = setTimeout(() => setVisible(true), 400);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
        onClick={() => setVisible(false)}
      >
        {/* Modal */}
        <div
          className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Gradient header */}
          <div className="bg-gradient-to-br from-orange-500 via-orange-400 to-amber-400 px-6 pt-8 pb-12 text-center text-white relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/10" />

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4 backdrop-blur-sm">
                <Code2 size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">
                Demo Application
              </h2>
              <p className="text-orange-100 text-sm mt-1 font-medium">
                For Demonstration Purposes Only
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 -mt-4">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 leading-relaxed">
              <p>
                <strong>{WEBSITE_NAME}</strong> web application has been
                developed strictly for{" "}
                <strong>portfolio & demonstration</strong> purposes by{" "}
                <strong className="text-orange-600">{DEVELOPER_NAME}</strong>.
              </p>
              <p className="mt-2">
                This is <strong>not a real commercial product</strong>. No
                actual orders, payments, or deliveries are processed through
                this platform.
              </p>
            </div>
          </div>

          {/* Developer info */}
          <div className="px-6 mt-4 flex items-center gap-3 bg-gray-50 mx-6 rounded-xl p-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
              {DEVELOPER_SHORT_NAME}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800">
                {DEVELOPER_NAME}
              </p>
              <p className="text-xs text-gray-500">{DEVELOPER_ROLE}</p>
            </div>
            <a
              href={DEVELOPER_GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-orange-500 transition-colors"
            >
              <ExternalLink size={18} />
            </a>
          </div>

          {/* Action */}
          <div className="px-6 pt-5 pb-6">
            <button
              onClick={() => setVisible(false)}
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-200 shadow-lg shadow-orange-200 active:scale-[0.98] cursor-pointer"
            >
              I Understand, Continue
            </button>
          </div>

          {/* Close button */}
          <button
            onClick={() => setVisible(false)}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-scale-in { animation: scale-in 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in { animation: fade-in 0.25s ease-out forwards; }
      `}</style>
    </>
  );
};
