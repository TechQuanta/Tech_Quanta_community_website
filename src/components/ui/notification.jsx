import React, { useEffect, useState } from "react";

const Notification = ({ notifications }) => {
  // Detect system theme (or your app theme)
  const [isDark, setIsDark] = useState(
    window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => setIsDark(e.matches);
    if (mq.addEventListener) {
      mq.addEventListener("change", handler);
    } else {
      mq.addListener(handler);
    }
    return () => {
      if (mq.removeEventListener) {
        mq.removeEventListener("change", handler);
      } else {
        mq.removeListener(handler);
      }
    };
  }, []);

  // State to hide notification after 20 seconds
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    // Hide notification after 20 seconds
    const hideTimer = setTimeout(() => setShowNotification(false), 20000);
    return () => {
      clearTimeout(hideTimer);
    };
  }, []);

  if (!showNotification) return null;

  const colors = isDark
    ? {
        background: "rgba(40, 51, 51, 0.75)",
        headline: "#90caf9",
        description: "#ccc",
        link: "#64b5f6",
        text: "#eee",
        shadow: "rgba(0, 0, 0, 0.5)",
      }
    : {
        background: "rgba(208, 97, 97, 0.44)",
        headline: "#1565c0",
        description: "#444",
        link: "#1976d2",
        text: "#222",
        shadow: "rgba(0, 0, 0, 0.1)",
      };

  // No opacity, transform or transition styles — pure static display
  const baseStyle = {
    ...containerStyle(colors),
  };

  if (!notifications || notifications.length === 0) {
    return (
      <div style={baseStyle}>
        <div style={singleNotificationStyle(colors)}>
          <span role="img" aria-label="welcome" style={{ marginRight: 8 }}>
            🙏
          </span>
          <span style={{ fontSize: 15, color: colors.text }}>
            Grateful for your visit! Welcome!
          </span>
        </div>
      </div>
    );
  }

  return (
    <div style={baseStyle}>
      {notifications.map((notif, idx) => (
        <div key={idx} style={notificationCardStyle(colors)}>
          <h3 style={{ ...headlineStyle(colors), marginBottom: 6 }}>
            {notif.notification_headline}
          </h3>
          {notif.notification_body && (
            <p style={{ ...descriptionStyle(colors), marginBottom: 10 }}>
              {notif.notification_body}
            </p>
          )}
          <a
            href={notif.notification_context_link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle(colors)}
            title={notif.notification_body || "More info"}
          >
            more...
          </a>
        </div>
      ))}
    </div>
  );
};

// Styles unchanged
const containerStyle = (colors) => ({
  position: "fixed",
  bottom: 20,
  right: 20,
  maxWidth: 330,
  maxHeight: 140,
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: 16,
  padding: 10,
  backgroundColor: colors.background,
  borderRadius: 12,
  boxShadow: `0 6px 18px ${colors.shadow}`,
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  fontSize: 12,
  zIndex: 9999,
  userSelect: "text",
});

const singleNotificationStyle = (colors) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "transparent",
  color: colors.text,
  fontWeight: 500,
});

const notificationCardStyle = (colors) => ({
  backgroundColor: "transparent",
  padding: "12px 0",
  borderRadius: 10,
  boxShadow: "none",
  color: colors.text,
});

const headlineStyle = (colors) => ({
  fontWeight: "700",
  fontSize: 14,
  color: colors.headline,
});

const descriptionStyle = (colors) => ({
  fontSize: 12,
  color: colors.description,
  lineHeight: 1.2,
  margin: 0,
});

const linkStyle = (colors) => ({
  color: colors.link,
  textDecoration: "underline",
  fontWeight: "900",
  cursor: "pointer",
  fontSize: 12,
});

export default Notification;
