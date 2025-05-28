import React, { useEffect, useState, lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/NavBar/Navigation";
import Footer from "../components/Footer/Footer";
const Notification = lazy(() => import("../components/ui/notification"));

const Layout = () => {
  const [notifications, setNotifications] = useState(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
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
          setNotifications([]);
        }
      }
      fetchNotifications();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      {notifications !== null && (
        <Suspense fallback={null}>
          <Notification notifications={notifications} />
        </Suspense>
      )}
    </>
  );
};

export default Layout;
