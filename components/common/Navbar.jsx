"use client";

import { Bookmark, Home, Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  const segment = useSelectedLayoutSegment();
  const router = useRouter();

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMobileMenuOpen]);

  // Keyboard shortcut Ctrl+K
  const handleKeyDown = useCallback(
    (e) => {
      if (segment === "search" || window.innerWidth < 768) return;
      if (e.ctrlKey && e.code === "KeyK") {
        e.preventDefault();
        desktopSearchRef.current?.focus();
      }
    },
    [segment]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Submit search
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
    if (window.innerWidth < 768) {
      setSearchTerm("");
      setIsMobileMenuOpen(false);
    }
  };

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/search", label: "Search", icon: Search },
    { href: "/bookmark", label: "Bookmark", icon: Bookmark },
  ];

  return (
    <nav
      className={`sticky top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-md bg-white/90 border-gray-300"
          : "bg-white/85 backdrop-blur-sm border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="group flex items-center space-x-2">
            <div className="relative">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-black via-indigo-400 to-black bg-clip-text text-transparent group-hover:from-indigo-400 group-hover:via-purple-500 group-hover:to-indigo-400 transition-all duration-300">
                Animao
              </h1>
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-4">
            {segment !== "search" && (
              <form onSubmit={handleSubmit}>
                <input
                  ref={desktopSearchRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search Anime... (Ctrl+K)"
                  className="px-3 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-64 text-sm transition-all duration-200"
                />
              </form>
            )}
            <ul className="flex items-center space-x-1">
              {links.map(({ href, label, icon: Icon }) => {
                const isActive =
                  (href === "/" && segment === null) ||
                  href === `/${segment ?? ""}`;

                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`group flex items-center gap-2 rounded-full px-4 py-2 text-gray-700 hover:text-indigo-400 font-medium transition-all duration-300 ${
                        isActive ? "text-indigo-500 bg-indigo-50" : ""
                      }`}
                    >
                      <Icon className="size-4 transition-all duration-300 group-hover:scale-110" />
                      <span className="relative">
                        {label}
                        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-indigo-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative p-2 rounded-lg text-gray-700 hover:text-indigo-400 hover:bg-indigo-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu-panel"
            >
              <div className="relative w-6 h-6">
                <Menu
                  className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                    isMobileMenuOpen
                      ? "rotate-90 opacity-0"
                      : "rotate-0 opacity-100"
                  }`}
                />
                <X
                  className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                    isMobileMenuOpen
                      ? "rotate-0 opacity-100"
                      : "-rotate-90 opacity-0"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu (raised above overlay) */}
        <div
          id="mobile-menu-panel"
          className={`relative z-50 md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen
              ? "max-h-64 opacity-100 pb-4"
              : "max-h-0 opacity-0 pb-0"
          }`}
        >
          <div className="pt-2 space-y-1">
            {segment !== "search" && (
              <form onSubmit={handleSubmit} className="px-4">
                <input
                  ref={mobileSearchRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search Anime..."
                  className="px-3 py-2 w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm transition-all duration-200"
                />
              </form>
            )}
            {links.map(({ href, label, icon: Icon }) => {
              const isActive =
                (href === "/" && segment === null) ||
                href === `/${segment ?? ""}`;

              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`group flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 hover:bg-indigo-50 hover:translate-x-1 ${
                    isActive ? "text-indigo-500" : "text-gray-700 hover:text-indigo-400"
                  }`}
                >
                  <div className="p-2 rounded-lg group-hover:bg-indigo-100 transition-colors duration-300">
                    <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <span className="flex-1">{label}</span>
                  <div className="w-2 h-2 rounded-full bg-indigo-400 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Backdrop (below the menu, clickable) */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-sm md:hidden z-40"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </nav>
  );
};

export default Navbar;
