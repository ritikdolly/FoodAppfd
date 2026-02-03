import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
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
  const { cartItems } = useCart();
  const { currentUser, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);

  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  // Derived Auth State
  const isLoggedIn = !!currentUser;
  const user = {
    name:
      currentUser?.displayName || currentUser?.email?.split("@")[0] || "User",
    initials: (currentUser?.displayName || currentUser?.email || "U")
      .slice(0, 2)
      .toUpperCase(),
    email: currentUser?.email,
  };

  const handleLogin = () => {
    // Auth state handled by context, just close modals
    setShowSignIn(false);
    setShowSignUp(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

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
            cartCount={cartItems.length}
            isLoggedIn={isLoggedIn}
            user={user}
            onLogin={() => setShowSignIn(true)}
            onSignup={() => setShowSignUp(true)}
            onLogout={handleLogout}
          />

          <MobileActions
            cartCount={cartItems.length}
            onOpen={() => setDrawerOpen(true)}
            isLoggedIn={isLoggedIn}
            onLogin={() => setShowSignIn(true)}
          />
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        links={navLinks}
        isLoggedIn={isLoggedIn}
        user={user}
        onLogin={() => {
          setDrawerOpen(false);
          setShowSignIn(true);
        }}
        onLogout={() => {
          setDrawerOpen(false);
          handleLogout();
        }}
      />

      {/* AUTH MODALS */}
      <SignInModal
        open={showSignIn}
        onClose={() => setShowSignIn(false)}
        onSwitch={() => {
          setShowSignIn(false);
          setShowSignUp(true);
        }}
        onLogin={handleLogin}
      />

      <SignUpModal
        open={showSignUp}
        onClose={() => setShowSignUp(false)}
        onSwitch={() => {
          setShowSignUp(false);
          setShowSignIn(true);
        }}
        onLogin={handleLogin}
      />
    </>
  );
};
