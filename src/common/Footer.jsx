import { FooterBrand } from "../components/footer/FooterBrand";
import { FooterLinks } from "../components/footer/FooterLinks";
import { FooterContact } from "../components/footer/FooterContact";
import { FooterNewsletter } from "../components/footer/FooterNewsletter";
import { FooterBottom } from "../components/footer/FooterBottom";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <FooterBrand />
          <FooterLinks />
          <FooterContact />
          <FooterNewsletter />
        </div>

        <FooterBottom />
      </div>
    </footer>
  );
};
