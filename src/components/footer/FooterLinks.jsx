export const FooterLinks = () => {
  const links = ["Home", "Menu", "Offers", "Restaurants", "About Us"];

  return (
    <div>
      <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
      <ul className="space-y-4">
        {links.map(link => (
          <li key={link}>
            <a
              href="#"
              className="text-sm hover:text-orange-500 transition flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-orange-600" />
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
