import React from "react";

import Footer from "../components/common/Footer";
import { Outlet } from "react-router";
import Navbar from "../components/common/Navbar";


export default function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-200px)]">
        
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
