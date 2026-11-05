import { useScroll, useSpring, motion } from "framer-motion";

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 z-[9999] h-[2px] origin-left"
            style={{
                scaleX,
                background: "linear-gradient(90deg, #a855f7, #6366f1, #ec4899)",
            }}
        />
    );
};

export default ScrollProgress;
