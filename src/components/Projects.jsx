import { motion } from "framer-motion";
import { projects } from "../data/projects";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const Projects = () => {
    return (
        <section id="projects" className="py-20 relative">
            <div className="section-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title mb-4">Featured Projects</h2>
                    <div className="w-20 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -10, transition: { duration: 0.2 } }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5, type: "spring", stiffness: 100 }}
                            className="glass-card overflow-hidden group relative"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <motion.img
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.5 }}
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80"></div>

                                {/* Overlay Buttons */}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
                                    <motion.a
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        whileHover={{ scale: 1.1, backgroundColor: "#9333ea" }}
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 bg-white/20 rounded-full text-white backdrop-blur-md border border-white/20"
                                    >
                                        <FaGithub size={20} />
                                    </motion.a>
                                    <motion.a
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        whileHover={{ scale: 1.1, backgroundColor: "#2563eb" }}
                                        href={project.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 bg-white/20 rounded-full text-white backdrop-blur-md border border-white/20"
                                    >
                                        <FaExternalLinkAlt size={20} />
                                    </motion.a>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((tech, idx) => (
                                        <span
                                            key={idx}
                                            className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="https://github.com/Tewelde-gebre"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary inline-flex items-center gap-2 hover:bg-white/10"
                    >
                        <FaGithub /> View More on GitHub
                    </motion.a>
                </div>
            </div>
        </section>
    );
};

export default Projects;
