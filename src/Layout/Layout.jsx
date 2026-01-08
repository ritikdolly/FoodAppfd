import React from 'react'
import { Header } from '../common/Header'
import { Footer } from '../common/Footer'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* IMPORTANT: push content below fixed header */}
      <main className="pt-20 flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

