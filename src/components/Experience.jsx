import { motion } from "framer-motion";
import { experience } from "../data/experience";

const Experience = () => {
    return (
        <section id="experience" className="py-20 relative">
            <div className="section-container max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title mb-4">Experience</h2>
                    <div className="w-20 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
                </motion.div>

                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
                    {experience.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                        >
                            {/* Icon / Dot */}
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 bg-white group-hover:bg-blue-600 transition-colors shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                <div className="w-3 h-3 bg-blue-500 rounded-full group-hover:bg-white transition-colors"></div>
                            </div>

                            {/* Card */}
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-6 md:p-8 hover:bg-gray-50/60 transition-all duration-300">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                        {exp.role}
                                    </h3>
                                    <span className="text-xs font-semibold px-2.5 py-1 rounded bg-blue-50 text-blue-700 border border-blue-200 whitespace-nowrap">
                                        {exp.period}
                                    </span>
                                </div>

                                <h4 className="text-lg font-medium text-gray-700 mb-3 flex items-center gap-2">
                                    <span className="text-purple-600">@</span> {exp.company}
                                </h4>

                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {exp.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
