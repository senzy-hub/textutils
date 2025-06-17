import React, { useState, useEffect } from "react";
import { FaCrown, FaStar, FaMagic, FaEnvelope } from "react-icons/fa";

export default function Navbar({ setPage, setSearchQuery }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { name: "Home", icon: <FaStar />, page: "home" },
    { name: "Features", icon: <FaMagic />, page: "features" },
    { name: "Contact", icon: <FaEnvelope />, page: "contact" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (setSearchQuery) setSearchQuery(searchTerm.trim());
    else alert(`Searching for "${searchTerm}"...`);
  };

  return (
    <>
      <nav className={`lux-navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="logo" onClick={() => { setPage("textutils"); setIsOpen(false); }}>
          <FaCrown className="crown" />
          <span className="gradient-text">TextUtils</span>
        </div>

        <form className="search" onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="Search brilliance..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search"
          />
          <button type="submit" aria-label="Submit Search">
            🔍
          </button>
        </form>

        <ul className="nav-links desktop">
          {navLinks.map((link, idx) => (
            <li key={idx}>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(link.page);
                  setIsOpen(false);
                }}
                tabIndex={0}
                aria-label={`Navigate to ${link.name}`}
              >
                {link.icon} <span>{link.name}</span>
              </a>
            </li>
          ))}
        </ul>

        <button
          className={`hamburger ${isOpen ? "open" : ""}`}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <ul className={`mobile-menu ${isOpen ? "show" : ""}`}>
        {navLinks.map((link, idx) => (
          <li key={idx} style={{ animationDelay: `${idx * 0.12 + 0.2}s` }}>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                setPage(link.page);
                setIsOpen(false);
              }}
              tabIndex={isOpen ? 0 : -1}
              aria-label={`Navigate to ${link.name}`}
            >
              {link.icon} <span>{link.name}</span>
            </a>
          </li>
        ))}
      </ul>

      <style>{`
        /* Container & Layout */
        .lux-navbar {
          position: sticky;
          top: 0;
          z-index: 1100;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2.5rem;
          background: rgba(18, 18, 40, 0.45);
          backdrop-filter: saturate(180%) blur(16px);
          border-bottom: 1px solid rgba(255, 215, 0, 0.12);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          transition: background 0.5s ease, box-shadow 0.5s ease;
          box-shadow: none;
        }

        .lux-navbar.scrolled {
          background: rgba(18, 18, 40, 0.95);
          box-shadow: 0 10px 30px rgba(255, 215, 0, 0.35);
          border-bottom: 1px solid rgba(255, 215, 0, 0.3);
        }

        /* Logo */
        .logo {
          display: flex;
          align-items: center;
          font-size: 2rem;
          font-weight: 900;
          cursor: pointer;
          gap: 0.7rem;
          color: #FFD700;
          user-select: none;
          filter: drop-shadow(0 0 3px #FFD700);
          transition: filter 0.3s ease;
        }
        .logo:hover {
          filter: drop-shadow(0 0 8px #FFD700);
        }

        .crown {
          color: #FFD700;
          animation: spinGlow 8s linear infinite;
          font-size: 1.9rem;
          line-height: 1;
        }

        @keyframes spinGlow {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.15); }
          100% { transform: rotate(360deg) scale(1); }
        }

        .gradient-text {
          background: linear-gradient(90deg, #FFD700 0%, #fff9cc 40%, #DAA520 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          user-select: none;
        }

        /* Search */
        .search {
          position: relative;
          flex: 1;
          max-width: 320px;
          margin: 0 1.5rem;
          display: flex;
          align-items: center;
        }

        .search input {
          width: 100%;
          padding: 0.5rem 1.2rem;
          padding-right: 3rem;
          border-radius: 9999px;
          border: none;
          background: rgba(255, 215, 0, 0.12);
          color: #fff;
          font-weight: 600;
          font-size: 1rem;
          transition: background 0.3s ease, width 0.4s ease;
          box-shadow: 0 0 8px rgba(255, 215, 0, 0.2);
          outline-offset: 2px;
        }
        .search input::placeholder {
          color: rgba(255, 215, 0, 0.7);
          font-style: italic;
        }
        .search input:focus {
          background: rgba(255, 215, 0, 0.25);
          width: 100%;
          outline: 2px solid #FFD700;
          outline-offset: 3px;
          box-shadow: 0 0 15px #FFD700;
        }

        .search button {
          position: absolute;
          right: 0.4rem;
          background: transparent;
          border: none;
          color: #FFD700;
          font-size: 1.3rem;
          cursor: pointer;
          user-select: none;
          transition: transform 0.2s ease;
          padding: 0 0.3rem;
          filter: drop-shadow(0 0 2px #FFD700);
        }
        .search button:hover {
          transform: scale(1.15);
          color: #fff;
          text-shadow: 0 0 8px #FFD700;
        }

        /* Desktop Links */
        .nav-links {
          display: flex;
          gap: 2rem;
          list-style: none;
          user-select: none;
          font-weight: 700;
          font-size: 1.05rem;
          color: white;
          text-shadow: 0 0 5px rgba(0,0,0,0.25);
        }

        .nav-links li a {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: white;
          padding: 0.4rem 0.6rem;
          border-radius: 8px;
          transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease;
          box-shadow: inset 0 0 0 0 transparent;
        }
        .nav-links li a:hover,
        .nav-links li a:focus {
          color: #FFD700;
          background: rgba(255, 215, 0, 0.15);
          box-shadow: inset 0 0 10px 2px #FFD700;
          transform: scale(1.1);
          outline: none;
          cursor: pointer;
        }

        /* Hamburger */
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 6px;
          cursor: pointer;
          padding: 0.4rem;
          border-radius: 8px;
          transition: background-color 0.3s ease;
        }
        .hamburger:hover {
          background-color: rgba(255, 215, 0, 0.15);
        }
        .hamburger span {
          width: 28px;
          height: 3.5px;
          background: white;
          border-radius: 2px;
          transition: all 0.4s ease;
          box-shadow: 0 0 3px #FFD700;
        }

        .hamburger.open span:nth-child(1) {
          transform: rotate(45deg) translate(6px, 6px);
          background: #FFD700;
          box-shadow: 0 0 10px #FFD700;
        }
        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }
        .hamburger.open span:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
          background: #FFD700;
          box-shadow: 0 0 10px #FFD700;
        }

        /* Mobile Menu */
        .mobile-menu {
          display: none;
          position: fixed;
          top: 70px;
          left: 0;
          width: 100%;
          background: rgba(18, 18, 40, 0.97);
          padding: 1.5rem 2rem;
          flex-direction: column;
          gap: 1.4rem;
          box-shadow: 0 10px 40px rgba(255, 215, 0, 0.5);
          user-select: none;
          z-index: 1050;
          transform: translateY(-20px);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease, transform 0.3s ease;
          border-top: 2px solid #FFD700;
          border-radius: 0 0 14px 14px;
        }
        .mobile-menu.show {
          display: flex;
          pointer-events: auto;
          transform: translateY(0);
          opacity: 1;
        }

        .mobile-menu li a {
          font-size: 1.3rem;
          font-weight: 700;
          color: white;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.7rem;
          padding: 0.6rem 1rem;
          border-radius: 10px;
          background: rgba(255, 215, 0, 0.08);
          box-shadow: 0 0 10px rgba(255, 215, 0, 0.25);
          filter: drop-shadow(0 0 4px #FFD700);
          animation: slideFadeIn 0.4s ease forwards;
          user-select: none;
          transition: background 0.3s ease, transform 0.3s ease;
        }
        .mobile-menu li a:hover,
        .mobile-menu li a:focus {
          background: #FFD700;
          color: #1a1a1a;
          transform: scale(1.05);
          outline: none;
          cursor: pointer;
          box-shadow: 0 0 20px #FFD700;
        }

        @keyframes slideFadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .desktop {
            display: none;
          }
          .hamburger {
            display: flex;
          }
          .search {
            max-width: 100%;
            margin: 0 0.7rem 0 0.7rem;
            flex: 1 1 auto;
          }
          .search input {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
