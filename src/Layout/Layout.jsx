// src/components/Layout/Layout.jsx
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/NavBar/Navigation";
import Footer from "../components/Footer/Footer";
import Notification from "../components/ui/notification";

const Layout = () => {
  const [notifications, setNotifications] = useState(null); // null = loading state

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const res = await fetch(
          "https://script.google.com/macros/s/AKfycbww8sRU8txw08-6Z5EuHIstbtu-pDELMo3G72i4qIcW2HRoNe06Sibz-YRqrbTB5Vce/exec"
        );
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setNotifications(data);
      } catch (error) {
        console.error("Notification fetch failed:", error);
        setNotifications([]); // fallback to empty
      }
    }
    fetchNotifications();
  }, []);

  return (
    <>
      <Header />
      <Outlet />
      <Footer className="absolute bottom-0  left-0 right-0" />
      {/* Show Notification only when notifications data is loaded */}
      {notifications !== null && <Notification notifications={notifications} />}
    </>
  );
};

export default Layout;
