import React from 'react'
import { Header } from '../common/Header'
import { Footer } from '../common/Footer'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* This pushes content below fixed header */}
      <main className="pt-8 flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
