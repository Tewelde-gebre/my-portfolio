import { motion } from "framer-motion";

const About = () => {
    return (
        <section id="about" className="py-20 bg-white text-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-400">
                            About Me
                        </h2>
                        <div className="w-20 h-1 bg-blue-500 mx-auto rounded"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <p className="text-gray-600 text-lg leading-relaxed">
                                I am a Software Engineering student at <span className="text-blue-600 font-semibold">Mekelle University</span>,
                                dedicated to building scalable and efficient web applications. With expertise in both
                                frontend and backend technologies, I enjoy solving complex problems
                                and creating user-friendly experiences.
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                My journey involves deep diving into modern frameworks like React
                                and Django, while also exploring the integration of AI/ML models
                                into web platforms. I am constantly learning and adapting to new
                                technologies to deliver high-quality software solutions.
                            </p>
                            <div className="pt-4">
                                <a
                                    href="#contact"
                                    className="text-blue-600 hover:text-blue-500 font-semibold border-b-2 border-blue-600 pb-1"
                                >
                                    Let's Work Together →
                                </a>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
                            <h3 className="text-2xl font-bold mb-6 text-gray-900">Focus Areas</h3>
                            <ul className="space-y-4">
                                <li className="flex items-center space-x-3">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                    <span className="text-gray-700">Backend Development (Django/DRF)</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                                    <span className="text-gray-700">Frontend Development (React/Next.js)</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                                    <span className="text-gray-700">API Design & Integration</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    <span className="text-gray-700">Database Management (PostgreSQL)</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                                    <span className="text-gray-700">AI Model Integration</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
