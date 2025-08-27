"use client";
import { Bookmark, Home, Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (pathname === "/search" || window.innerWidth < 768) {
        return;
      }

      if (e.ctrlKey && e.code === "KeyK") {
        e.preventDefault();
        console.log("Ctrl+K pressed from navbar");

        desktopSearchRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen && pathname !== "/search") {
    }
  }, [isMobileMenuOpen, pathname]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
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
      className={`sticky top-0 left-0 right-0 z-50 border-b border-gray-200 transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-md bg-white/90 border-gray-300"
          : "bg-white/85 backdrop-blur-sm border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="group flex items-center space-x-2">
              <div className="relative">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-black via-indigo-400 to-black bg-clip-text text-transparent group-hover:from-indigo-400 group-hover:via-purple-500 group-hover:to-indigo-400 transition-all duration-300">
                  Animao
                </h1>
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {pathname !== "/search" && (
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
              {links.map(({ href, label, icon: Icon }, index) => (
                <li key={index}>
                  <Link
                    href={href}
                    className={`group flex items-center gap-2 rounded-full px-4 py-2 text-gray-700 hover:text-indigo-400 font-medium transition-all duration-300 ${
                      pathname === href ? "text-indigo-500 bg-indigo-50" : ""
                    }`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <Icon className="size-4 transition-all duration-300 group-hover:scale-110" />
                    <span className="relative">
                      {label}
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-indigo-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative p-2 rounded-lg text-gray-700 hover:text-indigo-400 hover:bg-indigo-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
              aria-label="Toggle mobile menu"
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

        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen
              ? "max-h-64 opacity-100 pb-4"
              : "max-h-0 opacity-0 pb-0"
          }`}
        >
          <div className="pt-2 space-y-1">
            {pathname !== "/search" && (
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
            {links.map(({ href, label, icon: Icon }, index) => (
              <Link
                key={label}
                href={href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="group flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:text-indigo-400 font-medium transition-all duration-300 hover:bg-indigo-50 hover:translate-x-1"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="p-2 rounded-lg group-hover:bg-indigo-100 transition-colors duration-300">
                  <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <span className="flex-1">{label}</span>
                <div className="w-2 h-2 rounded-full bg-indigo-400 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm md:hidden z-[-1]"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
