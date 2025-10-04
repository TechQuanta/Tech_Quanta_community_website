// src/components/Layout/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/NavBar/Navigation";
import Footer from "../components/Footer/Footer";
// Removed: import Notification from "../components/ui/notification";

const Layout = () => {
  // Removed: const [notifications, setNotifications] = useState(null);
  // Removed: useEffect hook for fetching notifications

  return (
    <>
      <Header />
      <Outlet />
      <Footer className="absolute bottom-0  left-0 right-0" />
      {/* Removed: Notification component rendering */}
    </>
  );
};

export default Layout;