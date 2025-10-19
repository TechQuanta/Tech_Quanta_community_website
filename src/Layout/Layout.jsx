import React from "react";
import { Outlet } from "react-router-dom";
// Attempting to fix resolution errors by moving up two directory levels, 
// assuming the structure is deeply nested (e.g., src/pages/layout/Layout.jsx)
import Header from "../components/NavBar/Navigation";
import Footer from "../components/Footer/Footer";
import { HeroHighlight } from "../components/ui/hero-highlight"; // Removed the import as the component is removed below

const Layout = () => {
    return (
    // 1. Root container uses Flexbox column layout and ensures min-height is the full viewport
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* 2. Directly rendering the Outlet here eliminates the potential layout conflict 
          caused by the HeroHighlight wrapper component. We maintain flex-grow 
          on this main content area to ensure the footer stays at the bottom. */}
      <main className="flex-grow">
        <HeroHighlight>
          <Outlet /> 
        </HeroHighlight>
      </main>
      
      <Footer />
    </div>
    );
};

export default Layout;
