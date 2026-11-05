import { motion } from "framer-motion";

// Extended skills data with icons/colors and bento classes
const skillCategories = [
    {
        category: "Frontend",
        emoji: "🎨",
        color: "#06b6d4",
        bentoClass: "md:col-span-2 md:row-span-2",
        items: ["React.js", "Next.js", "JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "Framer Motion", "Redux", "Zustand"],
    },
    {
        category: "Backend (Node / Express)",
        emoji: "⚙️",
        color: "#6366f1",
        bentoClass: "md:col-span-1 md:row-span-2",
        items: ["Node.js", "Express.js", "REST APIs", "JWT Auth", "Socket.io", "Middleware", "MVC Pattern"],
    },
    {
        category: "Database",
        emoji: "🗄️",
        color: "#f59e0b",
        bentoClass: "md:col-span-1 md:row-span-1",
        items: ["MongoDB", "Mongoose", "PostgreSQL", "Redis"],
    },
    {
        category: "Mobile",
        emoji: "📱",
        color: "#10b981",
        bentoClass: "md:col-span-1 md:row-span-1",
        items: ["React Native", "Expo"],
    },
    {
        category: "AI & Integrations",
        emoji: "🤖",
        color: "#a855f7",
        bentoClass: "md:col-span-1 md:row-span-1",
        items: ["OpenAI API", "LangChain", "Stripe API", "Cloudinary"],
    },
    {
        category: "Tools & DevOps",
        emoji: "🛠️",
        color: "#ec4899",
        bentoClass: "md:col-span-3 md:row-span-1",
        items: ["Git", "GitHub", "Docker", "Postman", "Linux", "VS Code", "Netlify", "Vercel", "CI/CD"],
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.04 } }
};

const tagVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 15 } }
};

const Skills = () => {
    return (
        <section id="skills" className="relative py-32 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900/30 to-zinc-950 pointer-events-none" />
            <div
                className="orb w-[500px] h-[500px] bottom-0 left-[-150px] opacity-10"
                style={{ background: "radial-gradient(circle, #ec4899 0%, transparent 70%)" }}
            />

            <div className="section-container relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-20"
                >
                    <div className="section-label">
                        <span>Tech Stack</span>
                    </div>
                    <h2 className="section-title">
                        Technical{" "}
                        <span className="text-gradient">Expertise</span>
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
                        A curated set of technologies I use to build fast, scalable, and intelligent applications.
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[minmax(180px,auto)] gap-6">
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.08, duration: 0.6 }}
                            className={`glass-card p-7 relative overflow-hidden group flex flex-col ${category.bentoClass}`}
                        >
                            {/* Color accent */}
                            <div
                                className="absolute top-0 left-0 right-0 h-[2px]"
                                style={{ background: `linear-gradient(90deg, ${category.color}, transparent)` }}
                            />
                            <div
                                className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                                style={{ background: `${category.color}15`, transform: "translate(30%, -30%)" }}
                            />

                            {/* Category Header */}
                            <div className="flex items-center gap-3 mb-6 relative z-10">
                                <div
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
                                    style={{ backgroundColor: `${category.color}15`, border: `1px solid ${category.color}30`, boxShadow: `0 4px 20px ${category.color}20` }}
                                >
                                    {category.emoji}
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-white text-lg leading-tight">{category.category}</h3>
                                    <p className="text-zinc-500 text-xs mt-1 font-mono">{category.items.length} technologies</p>
                                </div>
                            </div>

                            {/* Tags */}
                            <motion.div
                                className="flex flex-wrap gap-2.5 relative z-10 mt-auto"
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                {category.items.map((skill, idx) => (
                                    <motion.span
                                        key={idx}
                                        variants={tagVariants}
                                        whileHover={{ scale: 1.08, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="skill-tag px-3 py-1.5 shadow-sm"
                                        style={{
                                            "--tag-color": category.color,
                                            boxShadow: `0 2px 10px ${category.color}10`
                                        }}
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Proficiency Bar Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-16 glass-card p-8 relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-500/5" />
                    <h3 className="text-xl font-heading font-bold text-white mb-8 relative z-10 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">📊</span>
                        Key Proficiency
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 relative z-10">
                        {[
                            { name: "React.js / Frontend",    level: 92, color: "#06b6d4" },
                            { name: "Node.js / Express.js",   level: 88, color: "#6366f1" },
                            { name: "MongoDB / Mongoose",     level: 85, color: "#f59e0b" },
                            { name: "JavaScript / TypeScript", level: 90, color: "#a855f7" },
                            { name: "REST API Design",        level: 87, color: "#ec4899" },
                            { name: "Docker / DevOps",        level: 60, color: "#10b981" },
                        ].map((item, i) => (
                            <div key={i} className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-zinc-200 text-sm font-semibold tracking-wide">{item.name}</span>
                                    <span className="text-zinc-400 text-xs font-mono font-bold">{item.level}%</span>
                                </div>
                                <div className="h-2 bg-zinc-900 rounded-full overflow-hidden border border-white/5 shadow-inner">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${item.level}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, delay: i * 0.1, type: "spring", stiffness: 50 }}
                                        className="h-full rounded-full relative"
                                        style={{ background: `linear-gradient(90deg, ${item.color}60, ${item.color})` }}
                                    >
                                        <div className="absolute inset-0 bg-white/20 w-full" style={{ animation: "shimmer 2s infinite" }} />
                                    </motion.div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
