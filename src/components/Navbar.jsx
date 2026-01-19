import { motion } from "framer-motion";
import { Sun, Moon, X, Menu } from "lucide-react";
import { useState } from "react";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", id: "#home" },
    { name: "About", id: "#about" },
    { name: "Skills", id: "#skills" },
    { name: "Projects", id: "#projects" }, 
    { name: "Contact", id: "#contact" },
  ];

  const lightColors = {
    navBg: "bg-gradient-to-br from-orange-200 to-white",
    textPrimary: "text-gray-900",
    textSecondary: "text-gray-800",
    textHover: "text-orange-500",
    textActive: "text-orange-600",
  };

  const darkColors = {
    navBg: "bg-gradient-to-br from-gray-900 to-black",
    textPrimary: "text-white",
    textSecondary: "text-gray-300",
    textHover: "text-orange-400",
    textActive: "text-orange-500",
  };

  const colors = darkMode ? darkColors : lightColors;

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <div className="flex justify-center w-full fixed z-50 mt-4">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`flex items-center justify-center ${colors.navBg} backdrop-blur-lg rounded-2xl px-4 lg:px-8 py-2 shadow-lg`}
      >
        <div className="flex items-center justify-between w-full space-x-6 lg:space-x-8">
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-2">
            <span className={`text-xl font-bold ${colors.textPrimary}`}>
              Kino
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.id}
                className={`text-xl ${
                  activeSection === item.id.replace("#", "")
                    ? colors.textActive + " border-b-2 border-orange-500"
                    : colors.textSecondary
                } hover:${colors.textHover} transition-colors duration-300`}
                whileHover={{ scale: 1.05 }}
                onClick={() =>
                  handleNavClick(item.id.replace("#", ""))
                }
              >
                {item.name}
              </motion.a>
            ))}

            {/* Dark Mode Button */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 ${colors.textPrimary} hover:${colors.textHover} transition-colors duration-300`}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-300" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Hire Me (scrolls correctly now) */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-4 py-2 rounded-full hover:from-orange-600 hover:to-yellow-500 transition-colors duration-300"
              onClick={() => handleNavClick("contact")}
            >
              Hire Me
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg ${
                darkMode ? "bg-gray-700" : "bg-gray-200"
              }`}
            >
              {isMenuOpen ? (
                <X className={`w-5 h-5 ${darkMode ? "text-white" : "text-gray-700"}`} />
              ) : (
                <Menu className={`w-5 h-5 ${darkMode ? "text-white" : "text-gray-700"}`} />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>
    </div>
  );
};

export default Navbar;