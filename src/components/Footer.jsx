import { FaGithub, FaLinkedin, FaTelegram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="py-8 relative">
            <div className="max-w-4xl mx-auto px-4">
                {/* Floating Glass Bar */}
                <div className="glass-panel rounded-2xl p-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl shadow-purple-900/10 border border-white/10">

                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                            Tewelde Gebre
                        </span>
                        <span className="text-gray-400">|</span>
                        <span className="text-gray-500 text-sm">
                            © 2026 All Rights Reserved.
                        </span>
                    </div>

                    <div className="flex items-center gap-6">
                        <a href="https://github.com/Tewelde-gebre" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-gray-50 hover:bg-blue-600 hover:text-white text-gray-500 transition-all duration-300">
                            <FaGithub size={20} />
                        </a>
                        <a href="#" className="p-2 rounded-lg bg-gray-50 hover:bg-blue-500 hover:text-white text-gray-500 transition-all duration-300">
                            <FaLinkedin size={20} />
                        </a>
                        <a href="#" className="p-2 rounded-lg bg-gray-50 hover:bg-blue-400 hover:text-white text-gray-500 transition-all duration-300">
                            <FaTelegram size={20} />
                        </a>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
