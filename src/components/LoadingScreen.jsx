import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const LoadingScreen = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState("loading"); // "loading" | "done"

    useEffect(() => {
        let current = 0;
        const steps = [
            { target: 30, delay: 60 },
            { target: 65, delay: 40 },
            { target: 85, delay: 80 },
            { target: 100, delay: 30 },
        ];

        let stepIndex = 0;
        const run = () => {
            if (stepIndex >= steps.length) return;
            const step = steps[stepIndex];
            if (current < step.target) {
                current++;
                setProgress(current);
                setTimeout(run, step.delay);
            } else {
                stepIndex++;
                if (stepIndex < steps.length) {
                    setTimeout(run, 200);
                } else {
                    setTimeout(() => {
                        setPhase("done");
                        setTimeout(onComplete, 700);
                    }, 300);
                }
            }
        };
        setTimeout(run, 100);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {phase === "loading" && (
                <motion.div
                    key="loader"
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed inset-0 z-[99998] flex flex-col items-center justify-center bg-zinc-950"
                >
                    {/* Animated background orbs */}
                    <div className="absolute inset-0 overflow-hidden">
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
                            style={{ background: "radial-gradient(circle, #a855f7 0%, transparent 70%)", filter: "blur(80px)" }}
                        />
                        <motion.div
                            animate={{
                                scale: [1.2, 1, 1.2],
                                opacity: [0.2, 0.4, 0.2],
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
                            style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)", filter: "blur(80px)" }}
                        />
                    </div>

                    <div className="relative z-10 flex flex-col items-center gap-10 w-full max-w-sm px-8">
                        {/* Logo */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold font-heading shadow-2xl shadow-purple-900/50"
                        >
                            TG
                        </motion.div>

                        {/* Name */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.7 }}
                            className="text-center"
                        >
                            <h1 className="text-3xl font-heading font-extrabold text-white tracking-tight">
                                Tewelde <span style={{ background: "linear-gradient(135deg, #a855f7, #6366f1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Gebre</span>
                            </h1>
                            <p className="text-zinc-500 text-sm mt-1 font-mono tracking-wider">Full Stack Developer</p>
                        </motion.div>

                        {/* Progress bar */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="w-full space-y-3"
                        >
                            <div className="flex justify-between items-center">
                                <span className="text-zinc-600 text-xs font-mono">Initializing portfolio</span>
                                <span className="text-purple-400 text-xs font-mono font-bold">{progress}%</span>
                            </div>
                            <div className="h-[2px] bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full rounded-full"
                                    style={{
                                        width: `${progress}%`,
                                        background: "linear-gradient(90deg, #a855f7, #6366f1, #ec4899)",
                                    }}
                                    transition={{ duration: 0.1 }}
                                />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;
