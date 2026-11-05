import { motion } from "framer-motion";
import { FaServer, FaReact, FaPlug, FaDatabase, FaRobot, FaCode } from "react-icons/fa";
import { HiOutlineAcademicCap, HiOutlineLightBulb } from "react-icons/hi2";

const focusAreas = [
    {
        title: "Backend Development",
        icon: <FaServer />,
        desc: "Django, DRF, Scalable REST APIs",
        color: "#6366f1",
        gradient: "from-indigo-600/20 to-indigo-600/5",
    },
    {
        title: "Frontend Engineering",
        icon: <FaReact />,
        desc: "React, Next.js, Modern UI",
        color: "#06b6d4",
        gradient: "from-cyan-600/20 to-cyan-600/5",
    },
    {
        title: "API Design",
        icon: <FaPlug />,
        desc: "RESTful, GraphQL, Webhooks",
        color: "#ec4899",
        gradient: "from-pink-600/20 to-pink-600/5",
    },
    {
        title: "Database Systems",
        icon: <FaDatabase />,
        desc: "PostgreSQL, Redis, MongoDB",
        color: "#10b981",
        gradient: "from-emerald-600/20 to-emerald-600/5",
    },
    {
        title: "AI Integration",
        icon: <FaRobot />,
        desc: "LLMs, Model Deployment, APIs",
        color: "#f59e0b",
        gradient: "from-amber-600/20 to-amber-600/5",
    },
    {
        title: "Clean Code",
        icon: <FaCode />,
        desc: "SOLID Principles, Design Patterns",
        color: "#a855f7",
        gradient: "from-purple-600/20 to-purple-600/5",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const itemVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 15 } }
};

const About = () => {
    return (
        <section id="about" className="relative py-32 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 dot-bg opacity-40 pointer-events-none" />
            <div
                className="orb w-[600px] h-[600px] top-0 right-[-200px] opacity-10"
                style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)" }}
            />

            <div className="section-container">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-20"
                >
                    <div className="section-label">
                        <span>About Me</span>
                    </div>
                    <h2 className="section-title">
                        My Story &{" "}
                        <span className="text-gradient">Vision</span>
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
                        A passionate software engineer building the intersection of elegant design and powerful technology.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* ─── Story Card ─── */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7 }}
                        className="lg:col-span-5 space-y-6"
                    >
                        <div className="glass-card p-8 relative overflow-hidden group">
                            {/* Card accent line */}
                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-600 via-violet-500 to-transparent" />

                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                                    <HiOutlineAcademicCap size={18} />
                                </div>
                                <h3 className="text-xl font-heading font-bold text-white">Background</h3>
                            </div>

                            <div className="space-y-4">
                                <p className="text-zinc-400 leading-relaxed">
                                    I am a Software Engineering student at{" "}
                                    <span className="text-purple-400 font-semibold">Mekelle University</span>,
                                    dedicated to building scalable and efficient web applications.
                                    With expertise in both frontend and backend technologies, I enjoy
                                    solving complex problems and creating user-friendly experiences.
                                </p>
                                <p className="text-zinc-400 leading-relaxed">
                                    My journey involves deep diving into modern frameworks like{" "}
                                    <span className="text-cyan-400 font-semibold">React</span> and{" "}
                                    <span className="text-emerald-400 font-semibold">Django</span>, while also
                                    exploring the integration of AI/ML models into web platforms.
                                </p>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/[0.06]">
                                <a
                                    href="#contact"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                                    }}
                                    className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold transition-colors group/link"
                                >
                                    Let's work together
                                    <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                                </a>
                            </div>
                        </div>

                        {/* Always Learning Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.15 }}
                            className="glass-card p-8 relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative z-10 flex items-center justify-between">
                                <div>
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                                            <HiOutlineLightBulb size={18} />
                                        </div>
                                        <h3 className="text-xl font-heading font-bold text-white">Always Learning</h3>
                                    </div>
                                    <p className="text-zinc-400 text-sm leading-relaxed">
                                        Currently expanding into Cloud Architecture, DevOps, and advanced AI/ML integration.
                                    </p>
                                </div>
                                <motion.div
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="text-4xl flex-shrink-0 ml-4"
                                >
                                    🚀
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* ─── Competencies Grid ─── */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="mb-6"
                        >
                            <h3 className="text-lg font-heading font-bold text-zinc-300">Core Competencies</h3>
                        </motion.div>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                        >
                            {focusAreas.map((area, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.02, y: -4 }}
                                    className="glass-card p-6 flex items-start gap-4 cursor-default"
                                >
                                    <div
                                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
                                        style={{
                                            backgroundColor: `${area.color}18`,
                                            border: `1px solid ${area.color}30`,
                                            color: area.color,
                                        }}
                                    >
                                        {area.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-heading font-bold text-white text-sm mb-1">{area.title}</h4>
                                        <p className="text-zinc-500 text-xs leading-relaxed">{area.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
