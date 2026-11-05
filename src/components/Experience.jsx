import { motion } from "framer-motion";
import { experience } from "../data/experience";
import { HiBriefcase } from "react-icons/hi2";
import TiltCard from "./TiltCard";

const Experience = () => {
    return (
        <section id="experience" className="relative py-32 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/0 via-zinc-900/20 to-zinc-950/0 pointer-events-none" />
            <div
                className="orb w-[400px] h-[400px] top-1/4 left-[-150px] opacity-10"
                style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)" }}
            />

            <div className="section-container relative z-10 max-w-4xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-20"
                >
                    <div className="section-label">Career History</div>
                    <h2 className="section-title">
                        Professional{" "}
                        <span className="text-gradient">Journey</span>
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
                        Experiences that shaped me into the developer I am today.
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-600/30 via-violet-600/50 to-transparent md:-translate-x-px" />

                    <div className="space-y-12">
                        {experience.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: index * 0.15, type: "spring", stiffness: 100, damping: 15 }}
                                className={`relative flex items-start gap-8 ${
                                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                }`}
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 z-10 flex-shrink-0">
                                    <motion.div
                                        whileHover={{ scale: 1.2 }}
                                        className="w-12 h-12 rounded-2xl bg-zinc-950 border-2 border-purple-500/50 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:border-purple-400 transition-all"
                                    >
                                        <HiBriefcase className="text-purple-400" size={18} />
                                    </motion.div>
                                </div>

                                {/* Card - Left side */}
                                <div className={`w-full pl-16 md:pl-0 ${
                                    index % 2 === 0 ? "md:pr-16 md:w-1/2 md:ml-0" : "md:pl-16 md:w-1/2 md:ml-auto"
                                }`}>
                                    <TiltCard className="glass-card p-7 relative overflow-hidden group">
                                        {/* Accent gradient */}
                                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-600 to-transparent" />
                                        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        <div className="relative z-10">
                                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                                                <h3 className="text-xl font-heading font-bold text-white leading-tight">
                                                    {exp.role}
                                                </h3>
                                                <span className="flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 font-mono shadow-sm shadow-purple-500/10">
                                                    {exp.period}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2 mb-4">
                                                <span className="text-purple-400 font-bold">@</span>
                                                <h4 className="text-base font-semibold text-zinc-300">{exp.company}</h4>
                                            </div>

                                            <p className="text-zinc-400 text-sm leading-relaxed italic border-l-2 border-purple-500/30 pl-4">
                                                "{exp.description}"
                                            </p>
                                        </div>
                                    </TiltCard>
                                </div>

                                {/* Spacer for alternating layout on desktop */}
                                <div className="hidden md:block md:w-1/2" />
                            </motion.div>
                        ))}
                    </div>

                    {/* End marker */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", delay: 0.3 }}
                        className="relative flex items-center justify-center md:justify-center mt-12"
                    >
                        <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/40" />
                        <p className="pl-20 md:pl-0 text-zinc-600 text-sm font-mono">More to come...</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
