import { WEBSITE_NAME } from "../../constants";
export const FooterBottom = () => {
  return (
    <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
      <p>
        © {new Date().getFullYear()} {WEBSITE_NAME}. All rights reserved.
      </p>
      <p className="text-gray-600 text-xs mt-1 md:mt-0">
        Developed by{" "}
        <a
          href="https://github.com/ritikdolly"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition"
        >
          Ritik Kumar
        </a>
      </p>
      <div className="flex gap-6">
        <a href="#" className="hover:text-white transition">
          Privacy Policy
        </a>
        <a href="#" className="hover:text-white transition">
          Terms of Service
        </a>
        <a href="#" className="hover:text-white transition">
          Cookie Policy
        </a>
      </div>
    </div>
  );
};
