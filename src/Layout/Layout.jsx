import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/NavBar/Navigation";
import Footer from "../components/Footer/Footer";
import { HeroHighlight } from "../components/ui/hero-highlight"; 

const Layout = () => {
    return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <HeroHighlight>
          <Outlet /> {/* This content will now be pinned */}
        </HeroHighlight>
      </main>
      
      <Footer />
    </div>
    );
};

export default Layout;