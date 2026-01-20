import { useEffect, useState } from "react";
import { Logo } from "../components/header/Logo";
import { SearchBar } from "../components/header/SearchBar";
import { NavLinks } from "../components/header/NavLinks.jsx";
import { DesktopActions } from "../components/header/DesktopActions";
import { MobileActions } from "../components/header/MobileActions";
import { MobileDrawer } from "../components/header/MobileDrawer";
import { navLinks } from "../components/header/navLinks";

import { SignInModal } from "../components/auth/SignInModal";
import { SignUpModal } from "../components/auth/SignUpModal";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);

  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  // Header shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile drawer opens
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "auto";
  }, [drawerOpen]);

  return (
    <>
      {/* HEADER */}
      <header
        className={`
          fixed top-0 left-0 w-full z-50 transition-all duration-300
          bg-white/80 backdrop-blur-md border-b border-gray-200/50 supports-backdrop-filter:bg-white/60
          ${scrolled ? "shadow-md py-2" : "py-4 shadow-sm"}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <Logo />

          <SearchBar
            focused={searchFocus}
            onFocus={() => setSearchFocus(true)}
            onBlur={() => setSearchFocus(false)}
          />

          <NavLinks links={navLinks} />

          <DesktopActions
            cartCount={3}
            isLoggedIn={false}
            onLogin={() => setShowSignIn(true)}
            onSignup={() => setShowSignUp(true)}
            onLogout={() => console.log("logout")}
          />

          <MobileActions cartCount={3} onOpen={() => setDrawerOpen(true)} />
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        links={navLinks}
      />

      {/* AUTH MODALS */}
      <SignInModal
        open={showSignIn}
        onClose={() => setShowSignIn(false)}
        onSwitch={() => {
          setShowSignIn(false);
          setShowSignUp(true);
        }}
      />

      <SignUpModal
        open={showSignUp}
        onClose={() => setShowSignUp(false)}
        onSwitch={() => {
          setShowSignUp(false);
          setShowSignIn(true);
        }}
      />
    </>
  );
};
