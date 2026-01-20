import React, { useEffect } from "react";
import { Header } from "../../../common/Header";
import { Footer } from "../../../common/Footer";
import { Outlet, useLocation } from "react-router-dom";

export const MainLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant", // or "smooth"
    });
  }, [pathname]);
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* This pushes content below fixed header */}
      <main className="pt-20 flex-1 flex flex-col min-h-0 relative">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
