import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = ({ profileImage }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const location = useLocation();

    const navLinks = [
        { name: "Home", to: "/" },
        { name: "About", to: "/about" },
        { name: "Projects", to: "/projects" },
        { name: "Skills", to: "/skills" },
        { name: "Experience", to: "/experience" },
        { name: "Contact", to: "/contact" },
    ];

    return (
        <>
            <nav
                className={`fixed w-full z-50 transition-all duration-300 ${scrolled
                    ? "bg-white/80 backdrop-blur-md border-b border-gray-200 py-3"
                    : "bg-transparent py-5"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        {/* Brand Section */}
                        <div className="flex-shrink-0 flex items-center gap-3">
                            <Link to="/" className="flex items-center gap-3 cursor-pointer group">
                                <div className="w-10 h-10 rounded-full border-2 border-white/10 overflow-hidden shadow-lg group-hover:border-purple-500 transition-colors duration-300">
                                    {profileImage ? (
                                        <img
                                            src={profileImage}
                                            alt="Logo"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
                                            Tewelde
                                        </div>
                                    )}
                                </div>
                                <span className="text-lg font-bold tracking-wide text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">

                                </span>
                            </Link>
                        </div>

                        {/* Desktop Navigation - Pill Style */}
                        <div className="hidden md:block">
                            <div className="flex items-center space-x-1 bg-white/50 backdrop-blur-lg px-2 py-1.5 rounded-full border border-gray-200">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.to}
                                        className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                                            location.pathname === link.to
                                                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                                                : "text-gray-600 hover:text-gray-900"
                                        }`}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="flex md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2 rounded-lg text-gray-900 bg-gray-100 hover:bg-gray-200 transition-all border border-gray-200 shadow-sm"
                                aria-label="Toggle Menu"
                            >
                                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="fixed inset-0 z-40 md:hidden"
                    >
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>

                        <div className="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-2xl flex flex-col pt-24 px-6 space-y-2 border-l border-gray-200">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.to}
                                    onClick={() => setIsOpen(false)}
                                    className={`block px-4 py-3 rounded-xl text-lg font-medium transition-colors cursor-pointer ${
                                        location.pathname === link.to
                                            ? "text-white bg-gradient-to-r from-blue-600 to-purple-600"
                                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
