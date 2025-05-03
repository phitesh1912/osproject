import { useState, useEffect, useRef } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FiHome, FiInfo, FiBook, FiGithub } from "react-icons/fi";
import "./Layout.css";

export default function Layout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const clickSoundRef = useRef(null);
  const bgMusicRef = useRef(null);
  
  useEffect(() => {
    if (bgMusicRef.current) {
      bgMusicRef.current.volume = 0.3;
    }
  }, []);

  // Close sidebar when route changes
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Play click sound on any click
  useEffect(() => {
    function handleClick() {
      if (clickSoundRef.current) {
        clickSoundRef.current.currentTime = 0;
        clickSoundRef.current.play();
      }
    }
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="layout-root">
      <button className={`hamburger-btn ${open ? "vertical" : ""}`} onClick={() => setOpen(!open)} aria-label="Toggle sidebar">
        ☰
      </button>
      <nav className={`sidebar ${open ? "open" : ""}`}>
        <Link to="/" className="sidebar-link" onClick={() => setOpen(false)}>
          <FiHome className="sidebar-icon" /> Home
        </Link>
        <Link to="/about" className="sidebar-link" onClick={() => setOpen(false)}>
          <FiInfo className="sidebar-icon" /> About
        </Link>
        <Link to="/documentation" className="sidebar-link" onClick={() => setOpen(false)}>
          <FiBook className="sidebar-icon" /> Documentation
        </Link>
        <a
          href="https://github.com/phitesh1912/osproject"
          className="sidebar-link"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
        >
          <FiGithub className="sidebar-icon" /> GitHub
        </a>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
      {/* Background cozy music */}
      <audio
        src="/calm-space-music-312291.mp3"
        autoPlay
        loop
        ref={bgMusicRef}
        style={{ display: "none" }}
      />
      {/* Click sound */}
      <audio ref={clickSoundRef} src="/mixkit-sci-fi-click-900.wav" preload="auto" />
    </div>
  );
}
