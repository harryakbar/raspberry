import { useState } from "react";
import NavLink from "./NavLink";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/apps", label: "Apps" },
  { to: "/bluetooth", label: "Bluetooth" },
  { to: "/metrics", label: "Metrics" },
  { to: "/alquran", label: "Al-Quran" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Raspberry Pi</h1>
        <div className="md:flex items-center space-x-4">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to}>
              {link.label}
            </NavLink>
          ))}
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden mt-2 flex flex-col space-y-2">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className="block">
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
