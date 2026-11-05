import { motion } from "framer-motion";
import { useState } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi2";
import TiltCard from "./TiltCard";

const projects = [
    {
        id: 1,
        title: "E-Commerce Platform",
        description: "A full-featured e-commerce platform with product listings, cart functionality, Stripe payment integration, and an admin dashboard.",
        tech: ["React", "Django", "PostgreSQL", "Tailwind CSS", "Stripe"],
        github: "https://github.com/Tewelde-gebre",
        demo: "https://example.com",
        image: "/project-ecommerce.png",
        color: "#6366f1",
        category: "Full Stack",
    },
    {
        id: 2,
        title: "Task Management App",
        description: "A collaborative task management tool with real-time updates, kanban boards, team workspaces, and file attachments.",
        tech: ["React", "Firebase", "Tailwind CSS", "Framer Motion"],
        github: "https://github.com/Tewelde-gebre",
        demo: "https://example.com",
        image: "/project-taskmanager.png",
        color: "#06b6d4",
        category: "Frontend",
    },
    {
        id: 3,
        title: "AI Image Generator",
        description: "An AI-powered creative tool using OpenAI's DALL-E API. Features prompt engineering, style presets, and image gallery.",
        tech: ["React", "Node.js", "OpenAI API", "MongoDB"],
        github: "https://github.com/Tewelde-gebre",
        demo: "https://example.com",
        image: "/project-aigenerator.png",
        color: "#a855f7",
        category: "AI",
    },
];

const filters = ["All", "Full Stack", "Frontend", "AI"];

const Projects = () => {
    const [activeFilter, setActiveFilter] = useState("All");
    const [hoveredId, setHoveredId] = useState(null);

    const filtered = activeFilter === "All"
        ? projects
        : projects.filter(p => p.category === activeFilter);

    return (
        <section id="projects" className="relative py-32 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/0 via-zinc-900/20 to-zinc-950/0 pointer-events-none" />
            <div className="absolute inset-0 dot-bg opacity-30 pointer-events-none" />
            <div
                className="orb w-[600px] h-[600px] top-1/2 right-[-200px] -translate-y-1/2 opacity-10"
                style={{ background: "radial-gradient(circle, #a855f7 0%, transparent 70%)" }}
            />

            <div className="section-container relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <div className="section-label">My Portfolio</div>
                    <h2 className="section-title">
                        Featured{" "}
                        <span className="text-gradient">Projects</span>
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
                        A selection of my best work — each project built with purpose, attention to detail, and modern best practices.
                    </p>
                </motion.div>

                {/* Filter Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex flex-wrap gap-2 mb-12"
                >
                    {filters.map((f) => (
                        <button
                            key={f}
                            onClick={() => setActiveFilter(f)}
                            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                                activeFilter === f
                                    ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                                    : "bg-white/[0.04] border border-white/[0.08] text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.08]"
                            }`}
                        >
                            {f}
                        </button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 perspective-1000">
                    {filtered.map((project, index) => (
                        <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            onHoverStart={() => setHoveredId(project.id)}
                            onHoverEnd={() => setHoveredId(null)}
                            className="h-full"
                        >
                            <TiltCard className="h-full">
                                <div
                                    className="group relative h-full bg-zinc-900/50 border border-white/[0.07] rounded-2xl overflow-hidden flex flex-col cursor-pointer hover:border-white/15 transition-all duration-500"
                                    style={{
                                        boxShadow: hoveredId === project.id
                                            ? `0 30px 60px ${project.color}15, 0 0 0 1px ${project.color}20`
                                            : "none"
                                    }}
                                >
                                    {/* Image */}
                                    <div className="relative h-52 overflow-hidden flex-shrink-0">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/30 to-transparent" />

                                        {/* Category badge */}
                                        <div
                                            className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                                            style={{
                                                backgroundColor: `${project.color}20`,
                                                border: `1px solid ${project.color}40`,
                                                color: project.color,
                                                backdropFilter: "blur(4px)"
                                            }}
                                        >
                                            {project.category}
                                        </div>

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm flex items-center justify-center gap-3 sm:gap-4 flex-wrap opacity-0 group-hover:opacity-100 transition-all duration-400 p-4">
                                            <motion.a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={(e) => e.stopPropagation()}
                                                className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-white/10 border border-white/20 rounded-xl text-white text-xs sm:text-sm font-semibold hover:bg-white/20 transition-all"
                                            >
                                                <FaGithub size={18} />
                                                Code
                                            </motion.a>
                                            <motion.a
                                                href={project.demo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={(e) => e.stopPropagation()}
                                                className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-white text-xs sm:text-sm font-semibold transition-all shadow-lg"
                                                style={{ background: project.color, boxShadow: `0 10px 30px ${project.color}40` }}
                                            >
                                                <FaExternalLinkAlt size={14} />
                                                Live Demo
                                            </motion.a>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex flex-col flex-grow relative bg-gradient-to-b from-zinc-900/50 to-zinc-900/90">
                                        <div className="flex items-start justify-between mb-3">
                                            <h3 className="text-xl font-heading font-bold text-white leading-tight group-hover:text-purple-300 transition-colors">
                                                {project.title}
                                            </h3>
                                            <HiArrowRight
                                                className="text-zinc-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 mt-1 ml-2"
                                                size={18}
                                            />
                                        </div>

                                        <p className="text-zinc-400 text-sm leading-relaxed flex-grow mb-6">
                                            {project.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/[0.05]">
                                            {project.tech.map((tech, idx) => (
                                                <span
                                                    key={idx}
                                                    className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.07] text-zinc-400"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </TiltCard>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mt-20 text-center"
                >
                    <p className="text-zinc-500 mb-6 text-sm">Want to see more? I have more projects on GitHub.</p>
                    <motion.a
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        href="https://github.com/Tewelde-gebre"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary inline-flex items-center gap-2 text-base px-8 py-3.5 shadow-lg shadow-purple-500/20"
                    >
                        <FaGithub size={20} />
                        <span>View All on GitHub</span>
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
