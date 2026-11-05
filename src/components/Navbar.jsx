import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import MagneticWrapper from "./MagneticWrapper";
import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

const navLinks = [
    { name: "Home",       href: "#home" },
    { name: "About",      href: "#about" },
    { name: "Projects",   href: "#projects" },
    { name: "Skills",     href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Contact",    href: "#contact" },
];

const Navbar = ({ profileImage }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);

            // Detect active section by scroll position
            const sections = navLinks.map(l => l.href.slice(1));
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 120) {
                        setActiveSection(sections[i]);
                        break;
                    }
                }
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = (href) => {
        setIsOpen(false);
        const el = document.getElementById(href.slice(1));
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                    scrolled
                        ? "py-3 bg-zinc-950/80 backdrop-blur-2xl border-b border-white/5 shadow-xl shadow-black/40"
                        : "py-5 bg-transparent"
                }`}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
                    {/* Brand */}
                    <a
                        href="#home"
                        onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
                        className="flex items-center gap-3 group cursor-pointer"
                    >
                        <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-white/10 shadow-lg group-hover:border-purple-500/50 transition-all duration-300 flex-shrink-0">
                            {profileImage ? (
                                <img src={profileImage} alt="TG" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-600 flex items-center justify-center text-white text-sm font-bold font-heading">
                                    TG
                                </div>
                            )}
                            <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span className="hidden sm:block text-lg font-heading font-bold text-white/90 tracking-tight group-hover:text-purple-300 transition-colors">
                            Tewelde<span className="text-purple-400">.</span>
                        </span>
                    </a>
                    {/* Theme toggle button */}
                    <button onClick={toggleTheme} className="ml-4 p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors">
                      {theme === "light" ? "🌙" : "☀️"}
                    </button>
                    
                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-6 bg-white/[0.03] border border-white/[0.06] rounded-full px-4 py-2 backdrop-blur-md shadow-lg shadow-black/20">
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.href.slice(1);
                            return (
                                <MagneticWrapper key={link.name}>
                                    <a
                                        href={link.href}
                                        onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                                        className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer flex items-center justify-center ${
                                            isActive
                                                ? "text-white nav-active shadow-md shadow-purple-500/20"
                                                : "text-zinc-400 hover:text-white hover:bg-white/10"
                                        }`}
                                    >
                                        <span className="relative z-10">{link.name}</span>
                                        {isActive && (
                                            <motion.div
                                                layoutId="nav-indicator"
                                                className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border border-purple-500/30"
                                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                            />
                                        )}
                                    </a>
                                </MagneticWrapper>
                            );
                        })}
                    </div>

                    {/* CTA + Mobile Toggle */}
                    <div className="flex items-center gap-3">
                        <MagneticWrapper>
                            <a
                                href="#contact"
                                onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
                                className="hidden md:inline-flex btn-primary text-sm py-2.5 px-6 rounded-full font-bold shadow-lg shadow-purple-500/25 border border-purple-400/30 hover:shadow-purple-500/40"
                            >
                                <span>Let's Talk</span>
                            </a>
                        </MagneticWrapper>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2.5 rounded-xl text-zinc-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                            aria-label="Toggle Menu"
                        >
                            <AnimatePresence mode="wait">
                                {isOpen ? (
                                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                                        <FaTimes size={18} />
                                    </motion.div>
                                ) : (
                                    <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                                        <FaBars size={18} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 md:hidden"
                        onClick={() => setIsOpen(false)}
                    >
                        <div className="absolute inset-0 bg-zinc-950/95 backdrop-blur-2xl" />
                        <div className="absolute inset-0 dot-bg opacity-30" />

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3, delay: 0.05 }}
                            className="flex flex-col items-center justify-center h-full gap-6 px-8"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ delay: i * 0.06 }}
                                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                                    className={`text-4xl font-heading font-bold tracking-tight transition-all cursor-pointer ${
                                        activeSection === link.href.slice(1)
                                            ? "text-gradient"
                                            : "text-zinc-500 hover:text-zinc-100"
                                    }`}
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                            <motion.a
                                href="/cv.pdf"
                                download
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: navLinks.length * 0.06 }}
                                className="mt-6 btn-primary text-lg px-8 py-3.5"
                                onClick={() => setIsOpen(false)}
                            >
                                <span>Download CV</span>
                            </motion.a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
