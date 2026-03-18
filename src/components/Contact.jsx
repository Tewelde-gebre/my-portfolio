import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaPhone } from "react-icons/fa";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus("sending");

        // Construct mailto link
        const subject = `Portfolio Contact from ${formData.name}`;
        const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;

        // Open email client
        window.location.href = `mailto:teweldegebre71@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus(""), 3000);
    };

    return (
        <section id="contact" className="py-20 relative">
            <div className="section-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title mb-4">Get In Touch</h2>
                    <div className="w-20 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-stretch">
                    {/* Info Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col justify-center space-y-8"
                    >
                        <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                            Let's create something amazing together.
                        </h3>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            I'm always open to discussing product design work or partnership opportunities.
                        </p>

                        <div className="space-y-6 pt-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 shrink-0 flex items-center justify-center">
                                    <FaEnvelope size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Email Me</p>
                                    <a href="mailto:teweldegebre71@gmail.com" className="text-lg text-gray-900 font-semibold hover:text-blue-600 transition-colors">
                                        teweldegebre71@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 shrink-0 flex items-center justify-center">
                                    <FaPhone size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Call Me</p>
                                    <a href="tel:+251954365786" className="text-lg text-gray-900 font-semibold hover:text-purple-600 transition-colors">
                                        +251 954 365 786
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-pink-50 text-pink-600 shrink-0 flex items-center justify-center">
                                    <FaMapMarkerAlt size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Location</p>
                                    <p className="text-lg text-gray-900 font-semibold">Mekelle, Ethiopia</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Form Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="glass-card p-8 md:p-10"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 pl-1">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-gray-50 text-gray-900 placeholder-gray-400 transition-all font-medium shadow-sm"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 pl-1">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-gray-50 text-gray-900 placeholder-gray-400 transition-all font-medium shadow-sm"
                                    placeholder="teweldegebre71@gmail.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2 pl-1">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows="4"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-gray-50 text-gray-900 placeholder-gray-400 transition-all font-medium resize-none shadow-sm"
                                    placeholder="Tell me about your project..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={status === "sending" || status === "success"}
                                className="w-full btn-primary py-4 text-base tracking-wide flex items-center justify-center gap-2 group"
                            >
                                {status === "sending" ? (
                                    "Sending..."
                                ) : status === "success" ? (
                                    "Message Sent!"
                                ) : (
                                    <>
                                        Send Message
                                        <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
