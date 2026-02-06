import React, { useEffect } from "react";
import { Header } from "../../../common/Header";
import { Footer } from "../../../common/Footer";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export const MainLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { userRole, loading } = useAuth();

  useEffect(() => {
    if (!loading && userRole === "ROLE_ADMIN") {
      navigate("/auth/admin");
    }
  }, [userRole, loading, navigate]);

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
      <main className="pt-16 md:pt-20 flex-1 flex flex-col min-h-0 relative">
        <div key={pathname} className="animate-fade-in flex-1 flex flex-col">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};
