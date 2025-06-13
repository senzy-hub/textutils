import React, { useState } from "react";

export default function Navbar({ setPage }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Removed "TextUtils" from the navLinks array
  const navLinks = [
    { name: "Home", href: "/", page: "home" },
   
    { name: "Blog", href: "/", page: "blog" },
    { name: "Contact", href: "/", page: "contact" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Search for: "${searchTerm}"`);
  };

  return (
    <>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.5rem 1.5rem",
          backgroundColor: "#000000",
          color: "#ffffff",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontWeight: "bold",
            fontSize: "1.5rem",
            cursor: "pointer",
            flex: "1 1 auto",
          }}
          onClick={() => setPage("textutils")}
        >
          TextUtils
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          style={{
            flex: "2 1 300px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              maxWidth: 400,
              padding: "0.4rem 0.8rem",
              borderRadius: 4,
              border: "none",
              outline: "none",
              fontSize: "1rem",
              backgroundColor: "#222",
              color: "#fff",
            }}
          />
        </form>

        {/* Desktop Links */}
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            gap: "1.5rem",
            margin: 0,
            padding: 0,
            flex: "2 1 auto",
            justifyContent: "flex-end",
          }}
          className="desktop-menu"
        >
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  if (link.page) setPage(link.page);
                  setIsOpen(false);
                }}
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger Icon */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: "none",
            flexDirection: "column",
            cursor: "pointer",
            gap: "5px",
          }}
          className="hamburger"
          aria-label="Toggle menu"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") setIsOpen(!isOpen);
          }}
        >
          <span
            style={{
              width: 25,
              height: 3,
              backgroundColor: "#fff",
              borderRadius: 2,
              transition: "all 0.3s ease",
              transform: isOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
            }}
          />
          <span
            style={{
              width: 25,
              height: 3,
              backgroundColor: "#fff",
              borderRadius: 2,
              opacity: isOpen ? 0 : 1,
              transition: "opacity 0.3s ease",
            }}
          />
          <span
            style={{
              width: 25,
              height: 3,
              backgroundColor: "#fff",
              borderRadius: 2,
              transition: "all 0.3s ease",
              transform: isOpen ? "rotate(-45deg) translate(6px, -6px)" : "none",
            }}
          />
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <ul
          style={{
            listStyle: "none",
            padding: "1rem 1.5rem",
            backgroundColor: "#000000",
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            position: "absolute",
            top: "60px",
            width: "100%",
            left: 0,
            zIndex: 999,
          }}
          className="mobile-menu"
        >
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  if (link.page) setPage(link.page);
                  setIsOpen(false);
                }}
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: 500,
                  fontSize: "1.2rem",
                  cursor: "pointer",
                }}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none;
          }
          .hamburger {
            display: flex !important;
          }
          form {
            flex-basis: 100%;
            order: 3;
          }
        }
      `}</style>
    </>
  );
}
