import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Logo } from "../components/header/Logo";
import { DesktopActions } from "../components/header/DesktopActions";
import { MobileActions } from "../components/header/MobileActions";
import { MobileDrawer } from "../components/header/MobileDrawer";
import { NavLinks } from "../components/header/NavLinks.jsx";
import { navLinks } from "../components/header/navLinks";

import { SignInModal } from "../components/auth/SignInModal";
import { SignUpModal } from "../components/auth/SignUpModal";

export const Header = () => {
  const { cartItems } = useCart();
  const { currentUser, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  // Derived Auth State
  const isLoggedIn = !!currentUser;
  const isAdmin = currentUser?.role === "ROLE_ADMIN"; // Assuming role is stored here
  const user = {
    name:
      currentUser?.displayName || currentUser?.email?.split("@")[0] || "User",
    initials: (currentUser?.displayName || currentUser?.email || "U")
      .slice(0, 2)
      .toUpperCase(),
    email: currentUser?.email,
    role: currentUser?.role,
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
      <header
        className={`
          fixed top-0 left-0 w-full z-50 transition-all duration-300
          bg-white border-b border-gray-100
          ${scrolled ? "shadow-md py-2" : "py-3 md:py-4 shadow-sm"}
        `}
      >
      
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">
          <Logo />

          {/* Right Side Actions Group */}
          <div className="flex items-center gap-4 sm:gap-8">
            <NavLinks links={navLinks} />

            <DesktopActions
              cartCount={cartItems.length}
              isLoggedIn={isLoggedIn}
              isAdmin={isAdmin}
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
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        links={navLinks}
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
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
