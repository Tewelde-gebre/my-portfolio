import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTelegram, FaHeart } from "react-icons/fa";
import { HiArrowUp } from "react-icons/hi2";
import MagneticWrapper from "./MagneticWrapper";

const Footer = () => {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <footer className="relative py-16 border-t border-white/[0.06] overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent pointer-events-none" />
            <div className="absolute inset-0 dot-bg opacity-30 pointer-events-none" />
            <div className="absolute bottom-[-150px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">

                    {/* Brand + Copyright */}
                    <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
                        <MagneticWrapper>
                            <div className="flex items-center gap-3 cursor-pointer group">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white text-sm font-bold font-heading shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-300">
                                    TG
                                </div>
                                <span className="font-heading font-bold text-white text-lg group-hover:text-purple-300 transition-colors">Tewelde Gebre</span>
                            </div>
                        </MagneticWrapper>
                        
                        <span className="hidden md:block text-zinc-700">•</span>
                        <p className="text-zinc-500 text-sm flex items-center gap-1.5">
                            Built with
                            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
                                <FaHeart className="text-pink-500 text-sm drop-shadow-md shadow-pink-500/50" />
                            </motion.div>
                            using React & Framer
                        </p>
                        <span className="hidden md:block text-zinc-700">•</span>
                        <span className="text-zinc-600 text-sm font-mono">© {new Date().getFullYear()}</span>
                    </div>

                    {/* Social Links & Back to Top */}
                    <div className="flex items-center gap-4">
                        {[
                            { icon: <FaGithub size={18} />, href: "https://github.com/Tewelde-gebre", label: "GitHub" },
                            { icon: <FaLinkedin size={18} />, href: "#", label: "LinkedIn" },
                            { icon: <FaTelegram size={18} />, href: "#", label: "Telegram" },
                        ].map((s) => (
                            <MagneticWrapper key={s.label}>
                                <motion.a
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.label}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 rounded-2xl flex items-center justify-center text-zinc-400 bg-white/[0.03] border border-white/[0.08] hover:text-white hover:bg-purple-600 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
                                >
                                    {s.icon}
                                </motion.a>
                            </MagneticWrapper>
                        ))}

                        {/* Divider */}
                        <div className="w-px h-8 bg-white/10 mx-2" />

                        {/* Scroll To Top */}
                        <MagneticWrapper>
                            <motion.button
                                onClick={scrollToTop}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Back to top"
                                className="w-10 h-10 rounded-2xl flex items-center justify-center text-purple-400 bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500 hover:text-white hover:shadow-lg hover:shadow-purple-500/40 transition-all duration-300"
                            >
                                <HiArrowUp size={18} />
                            </motion.button>
                        </MagneticWrapper>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
