import { useRef, useState } from "react";
import { motion } from "framer-motion";

const TiltCard = ({ children, className = "", style = {} }) => {
    const ref = useRef(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        
        // Calculate mouse position relative to the center of the card
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Convert to percentage (-1 to 1)
        const xPct = (x / rect.width - 0.5) * 2;
        const yPct = (y / rect.height - 0.5) * 2;
        
        // Limit the tilt angle
        setTilt({ x: -yPct * 8, y: xPct * 8 });
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{
                rotateX: tilt.x,
                rotateY: tilt.y,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.5 }}
            style={{ 
                transformPerspective: 1000,
                transformStyle: "preserve-3d",
                ...style 
            }}
            className={className}
        >
            {/* The wrapper that prevents children from clipping during 3d transform */}
            <div style={{ transform: "translateZ(30px)", width: "100%", height: "100%" }}>
                {children}
            </div>
        </motion.div>
    );
};

export default TiltCard;
