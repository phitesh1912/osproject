import React from "react";
import LeavesAnimation from "./components/LeavesAnimation/LeavesAnimation";

// Example layout component
export default function Layout({ children }) {
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {/* Leaves animation background */}
      <LeavesAnimation />
      {/* Main content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}