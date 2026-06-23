import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  Archive,
  User,
  Github,
  Menu,
  X,
  Code2,
} from "lucide-react";

const navItems = [
  { path: "/", label: "首页", icon: Home },
  { path: "/archive", label: "归档", icon: Archive },
  { path: "/about", label: "关于", icon: User },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gh-bg/80 backdrop-blur-md border-b border-gh-border"
          : "bg-transparent"
      }`}
    >
      <div className="container">
      <div className="flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-gh-green/20 border border-gh-green/30 flex items-center justify-center group-hover:bg-gh-green/30 transition-colors">
            <Code2 className="w-5 h-5 text-gh-green" />
          </div>
          <span className="font-mono font-bold text-lg text-gh-text">
            {"<STEMirror/>"}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2 ${
                  isActive
                    ? "text-gh-green"
                    : "text-gh-text-muted hover:text-gh-text"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-gh-green"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-md text-gh-text-muted hover:text-gh-text transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gh-text-muted hover:text-gh-text transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden pb-4"
        >
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-3 rounded-md flex items-center gap-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-gh-green/10 text-gh-green"
                      : "text-gh-text-muted hover:bg-gh-bg-tertiary hover:text-gh-text"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
      </div>
    </motion.header>
  );
}
