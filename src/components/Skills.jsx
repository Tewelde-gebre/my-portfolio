import { motion } from "framer-motion";
import { skills } from "../data/skills";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const Skills = () => {
    return (
        <section id="skills" className="py-20 relative">
            <div className="section-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title mb-4">Skills</h2>
                    <div className="w-20 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {skills.map((category, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card p-8 hover:bg-gray-50/60 transition-colors duration-300 border border-gray-200"
                        >
                            <h3 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                                <span className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></span>
                                {category.category}
                            </h3>

                            <motion.div
                                className="flex flex-wrap gap-3"
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                {category.items.map((skill, idx) => (
                                    <motion.span
                                        key={idx}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.05, backgroundColor: "rgba(0, 0, 0, 0.05)" }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 text-sm font-medium transition-all duration-300 cursor-default"
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
