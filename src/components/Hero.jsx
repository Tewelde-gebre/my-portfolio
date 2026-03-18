import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTelegram, FaCamera, FaCloudUploadAlt } from "react-icons/fa";
import { useRef } from "react";

const Hero = ({ profileImage, onImageUpdate }) => {
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onImageUpdate(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <section
            id="home"
            className="min-h-screen flex items-center justify-center relative overflow-hidden pt-28 pb-20 px-4 sm:px-6 lg:px-8"
        >
            {/* Background decoration */}
            <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-purple-100 via-blue-50 to-transparent pointer-events-none"></div>
            <div className="absolute top-10 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

                {/* Text Content - Left Side */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center lg:text-left space-y-6 order-2 lg:order-1"
                >
                    <div className="inline-block px-4 py-1.5 rounded-full border border-purple-200 bg-purple-50 backdrop-blur-sm text-purple-700 text-sm font-medium">
                        Welcome to my creative space
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight leading-tight">
                        Hi, I'm <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">Tewelde Gebre</span>
                    </h1>

                    <h2 className="text-xl md:text-2xl font-medium text-gray-600">
                        Full Stack Developer | Django + React | <span className="text-blue-600">AI Integration</span>
                    </h2>

                    <p className="text-gray-600 max-w-xl mx-auto lg:mx-0 text-lg leading-relaxed">
                        I craft high-performance web applications and intelligent systems.
                        Currently studying Software Engineering at Mekelle University.
                    </p>

                    <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                        <Link
                            to="/projects"
                            className="btn-primary"
                        >
                            View Projects
                        </Link>
                        <a
                            href="/cv.pdf"
                            download
                            className="btn-secondary cursor-pointer flex items-center gap-2"
                        >
                            Download CV
                        </a>

                        <div className="flex items-center gap-3 ml-2">
                            <a href="https://github.com/Tewelde-gebre" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-all backdrop-blur-sm border border-gray-200"><FaGithub size={20} /></a>
                            <a href="#" className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-all backdrop-blur-sm border border-gray-200"><FaLinkedin size={20} /></a>
                            <a href="#" className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-all backdrop-blur-sm border border-gray-200"><FaTelegram size={20} /></a>
                        </div>
                    </div>
                </motion.div>

                {/* Image Content - Right Side */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative flex justify-center order-1 lg:order-2"
                >
                    <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                        {/* Glowing Ring 1 */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 blur-2xl opacity-40 animate-pulse"></div>
                        {/* Glowing Ring 2 */}
                        <div className="absolute -inset-4 rounded-full border border-white/10 border-t-purple-500/50 border-r-blue-500/50 spin-slow"></div>

                        {/* Main Image Container */}
                        <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl group">
                            {profileImage ? (
                                <img
                                    src={profileImage}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 flex-col gap-2">
                                    <FaCamera size={40} />
                                    <span className="text-sm">No Image</span>
                                </div>
                            )}

                            {/* Hover Upload Overlay */}
                            <div
                                onClick={() => fileInputRef.current.click()}
                                className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer backdrop-blur-sm"
                            >
                                <FaCloudUploadAlt size={40} className="text-white mb-2" />
                                <span className="text-white font-medium">Upload Photo</span>
                            </div>
                        </div>

                        {/* Floating Upload Button (visible on mobile too) */}
                        <button
                            onClick={() => fileInputRef.current.click()}
                            className="absolute bottom-4 right-4 md:bottom-8 md:right-8 bg-white/80 backdrop-blur-md p-3 rounded-full text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors shadow-lg lg:hidden"
                        >
                            <FaCamera size={20} />
                        </button>

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
        </section>
    );
};

export default Hero;
