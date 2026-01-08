import { useEffect, useState } from "react";
import { Logo } from "../components/header/Logo";
import { SearchBar } from "../components/header/SearchBar";
import { NavLinks } from "../components/header/NavLinks.jsx";
import { DesktopActions } from "../components/header/DesktopActions";
import { MobileActions } from "../components/header/MobileActions";
import { MobileDrawer } from "../components/header/MobileDrawer";
import { navLinks } from "../components/header/navLinks";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "auto";
  }, [drawerOpen]);

  return (
    <>
      <header className={`fixed w-full z-50 bg-white/95 py-4 transition ${scrolled ? "shadow-md" : "border-b"}`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-4 justify-between">
          <Logo />
          <SearchBar
            focused={searchFocus}
            onFocus={() => setSearchFocus(true)}
            onBlur={() => setSearchFocus(false)}
          />
          <NavLinks links={navLinks} />
          <DesktopActions cartCount={3} />
          <MobileActions cartCount={3} onOpen={() => setDrawerOpen(true)} />
        </div>
      </header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} links={navLinks} />
    </>
  );
};

