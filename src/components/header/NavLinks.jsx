export const NavLinks = ({ links }) => (
  <nav className="hidden lg:flex gap-6">
    {links.map((link) => (
      <a
        key={link.name}
        href={link.href}
        className={`text-sm font-medium transition hover:text-orange-500
        ${link.active ? "text-orange-600" : "text-gray-600"}`}
      >
        {link.name}
      </a>
    ))}
  </nav>
);
