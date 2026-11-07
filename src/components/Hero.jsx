import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { FaGithub, FaLinkedin, FaTelegram, FaCamera, FaCloudUploadAlt, FaArrowRight, FaDownload } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

const TYPING_WORDS = ["MERN Stack Developer", "Full Stack Engineer", "React.js Expert", "Node.js Developer"];

const Hero = ({ profileImage, onImageUpdate }) => {
    const fileInputRef = useRef(null);
    const [typedText, setTypedText] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    // Typing animation
    useEffect(() => {
        const currentWord = TYPING_WORDS[wordIndex];
        let timeout;

        if (isPaused) {
            timeout = setTimeout(() => {
                setIsPaused(false);
                setIsDeleting(true);
            }, 2000);
        } else if (isDeleting) {
            if (typedText.length === 0) {
                setIsDeleting(false);
                setWordIndex((prev) => (prev + 1) % TYPING_WORDS.length);
            } else {
                timeout = setTimeout(() => setTypedText((t) => t.slice(0, -1)), 50);
            }
        } else {
            if (typedText.length === currentWord.length) {
                setIsPaused(true);
            } else {
                timeout = setTimeout(
                    () => setTypedText(currentWord.slice(0, typedText.length + 1)),
                    80
                );
            }
        }

        return () => clearTimeout(timeout);
    }, [typedText, isDeleting, isPaused, wordIndex]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => onImageUpdate(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const socials = [
        { icon: <FaGithub size={18} />, href: "https://github.com/Tewelde-gebre", label: "GitHub" },
        { icon: <FaLinkedin size={18} />, href: "#", label: "LinkedIn" },
        { icon: <FaTelegram size={18} />, href: "https://t.me/Tegew", label: "Telegram" },
    ];

    const stats = [
        { value: "2+", label: "Years Coding" },
        { value: "10+", label: "Projects Built" },
        { value: "∞", label: "Lines of Code" },
    ];

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12 px-4 sm:px-6 lg:px-8"
        >
            {/* Background Orbs */}
            <div
                className="orb w-[600px] h-[600px] top-[-10%] left-[-10%] opacity-30"
                style={{ background: "radial-gradient(circle, #a855f7 0%, transparent 70%)" }}
            />
            <div
                className="orb w-[500px] h-[500px] bottom-[-10%] right-[-10%] opacity-20"
                style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)", animationDelay: "-4s" }}
            />
            <div
                className="orb w-[300px] h-[300px] top-[40%] right-[20%] opacity-15"
                style={{ background: "radial-gradient(circle, #ec4899 0%, transparent 70%)", animationDelay: "-2s" }}
            />

            {/* Grid Background */}
            <div className="absolute inset-0 grid-bg opacity-100 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zinc-950 pointer-events-none" />

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

                    {/* ─── Left: Text Content ─── */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        className="text-center lg:text-left space-y-8 order-2 lg:order-1"
                    >
                        {/* Status Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-semibold"
                        >
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                            </span>
                            Available for new projects
                        </motion.div>

                        {/* Heading */}
                        <div>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-zinc-500 text-sm font-mono font-medium tracking-[0.15em] uppercase mb-3"
                            >
                                Hi there, I'm
                            </motion.p>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                className="text-5xl md:text-6xl xl:text-7xl font-heading font-extrabold text-white leading-[1.05] tracking-tight"
                            >
                                Tewelde
                                <br />
                                <span className="text-gradient">Gebre</span>
                            </motion.h1>
                        </div>

                        {/* Typing Animation */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center justify-center lg:justify-start gap-2 text-xl md:text-2xl font-medium text-zinc-300"
                        >
                            <HiSparkles className="text-purple-400 flex-shrink-0" size={20} />
                            <span>
                                {typedText}
                                <span className="cursor-blink" />
                            </span>
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="text-zinc-400 text-lg leading-relaxed max-w-lg mx-auto lg:mx-0"
                        >
                            I build end-to-end web applications using the{" "}
                            <span className="text-purple-400 font-semibold">MERN Stack</span>{" "}
                            — MongoDB, Express, React &amp; Node.js. With degrees in{" "}
                            <span className="text-purple-400 font-semibold">Software Engineering</span> &amp;{" "}
                            <span className="text-purple-400 font-semibold">Business Management</span>,
                            crafting fast, scalable, and beautiful full-stack experiences.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
                        >
                            <a
                                href="#projects"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                                }}
                                className="btn-primary group"
                            >
                                <span>View My Work</span>
                                <FaArrowRight className="group-hover:translate-x-1 transition-transform" size={14} />
                            </a>
                            <a
                                href="/cv.pdf"
                                download
                                className="btn-secondary"
                            >
                                <FaDownload size={14} />
                                Download CV
                            </a>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="flex items-center justify-center lg:justify-start gap-3"
                        >
                            {socials.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.label}
                                    className="w-10 h-10 rounded-xl flex items-center justify-center text-zinc-500 bg-white/[0.04] border border-white/[0.08] hover:text-purple-400 hover:border-purple-500/40 hover:bg-purple-500/10 transition-all duration-300"
                                >
                                    {s.icon}
                                </a>
                            ))}
                            <div className="h-px w-12 bg-white/10 mx-1" />
                            <span className="text-zinc-600 text-xs font-mono">@Tewelde-gebre</span>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-8 pt-4 border-t border-white/[0.06]"
                        >
                            {stats.map((stat) => (
                                <div key={stat.label} className="text-center lg:text-left">
                                    <p className="text-2xl font-heading font-bold text-white">{stat.value}</p>
                                    <p className="text-xs text-zinc-500 font-medium">{stat.label}</p>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* ─── Right: Profile Image ─── */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        className="relative flex justify-center order-1 lg:order-2"
                    >
                        {/* Outer Glow Ring */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 blur-3xl opacity-20 scale-95 float-anim" />

                        {/* Image Container */}
                        <div className="relative w-72 h-72 md:w-[26rem] md:h-[26rem]">
                            {/* Rotating Ring */}
                            <div
                                className="absolute -inset-4 rounded-full border border-dashed border-purple-500/20"
                                style={{ animation: "spin 30s linear infinite" }}
                            />
                            <div
                                className="absolute -inset-8 rounded-full border border-dashed border-indigo-500/10"
                                style={{ animation: "spin 50s linear infinite reverse" }}
                            />

                            {/* Profile Card */}
                            <div
                                className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 group cursor-pointer shadow-2xl shadow-purple-900/20"
                                onClick={() => fileInputRef.current.click()}
                            >
                                {/* Background gradient for empty state */}
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-violet-900/20 to-indigo-900/40" />

                                {profileImage ? (
                                    <img
                                        src={profileImage}
                                        alt="Tewelde Gebre"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center gap-3 relative">
                                        <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                            <FaCamera size={36} className="text-zinc-600" />
                                        </div>
                                        <p className="text-zinc-500 text-sm font-medium">Click to add photo</p>
                                    </div>
                                )}

                                {/* Upload Overlay */}
                                <div className="absolute inset-0 bg-zinc-950/70 backdrop-blur-sm flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    <FaCloudUploadAlt size={40} className="text-purple-400" />
                                    <span className="text-white font-semibold text-sm">Upload Photo</span>
                                </div>
                            </div>

                            {/* Floating Badge: Experience */}
                            <motion.div
                                animate={{ y: [0, -12, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-6 -right-2 md:-right-8 glass-card-nohover px-4 py-3 shadow-xl z-20 hidden md:block"
                            >
                                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-0.5">Stack</p>
                                <p className="text-sm font-bold text-white font-heading">MERN Stack</p>
                            </motion.div>

                            {/* Floating Badge: University */}
                            <motion.div
                                animate={{ y: [0, 12, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute -bottom-6 -left-2 md:-left-8 glass-card-nohover px-4 py-3 shadow-xl z-20 hidden md:block"
                            >
                                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-0.5">Degrees</p>
                                <p className="text-sm font-bold text-white font-heading">Software Engineering & Business Management</p>
                            </motion.div>

                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
                    onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                >
                    <span className="text-zinc-600 text-xs font-mono tracking-widest uppercase">Scroll</span>
                    <div className="w-5 h-9 rounded-full border border-white/10 flex items-start justify-center p-1.5">
                        <motion.div
                            animate={{ y: [0, 14, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="w-1.5 h-1.5 rounded-full bg-purple-500"
                        />
                    </div>
                </motion.div>
            </div>

            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </section>
    );
};

export default Hero;
