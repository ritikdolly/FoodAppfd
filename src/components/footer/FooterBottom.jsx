export const FooterBottom = () => {
  return (
    <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
      <p>
        © {new Date().getFullYear()} Prajapati Line Hotel Tulbull. All rights reserved.
      </p>
      <div className="flex gap-6">
        <a href="#" className="hover:text-white transition">Privacy Policy</a>
        <a href="#" className="hover:text-white transition">Terms of Service</a>
        <a href="#" className="hover:text-white transition">Cookie Policy</a>
      </div>
    </div>
  );
};
