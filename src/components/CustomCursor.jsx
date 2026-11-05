import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const dotRef = useRef(null);
    const [isPointer, setIsPointer] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const pos = useRef({ x: 0, y: 0 });
    const dotPos = useRef({ x: 0, y: 0 });
    const rafRef = useRef(null);

    useEffect(() => {
        // Only show on non-touch devices
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const cursor = cursorRef.current;
        const dot = dotRef.current;
        if (!cursor || !dot) return;

        const onMove = (e) => {
            pos.current = { x: e.clientX, y: e.clientY };
        };

        const onEnter = () => setIsHidden(false);
        const onLeave = () => setIsHidden(true);

        const checkPointer = (e) => {
            const el = e.target;
            const isLink = el.closest("a, button, [role='button'], input, textarea, select, label, [class*='cursor-pointer']");
            setIsPointer(!!isLink);
        };

        const animate = () => {
            // Dot follows cursor directly
            dotPos.current.x += (pos.current.x - dotPos.current.x) * 0.08;
            dotPos.current.y += (pos.current.y - dotPos.current.y) * 0.08;

            if (cursor) {
                cursor.style.transform = `translate(${pos.current.x - 12}px, ${pos.current.y - 12}px)`;
            }
            if (dot) {
                dot.style.transform = `translate(${dotPos.current.x - 4}px, ${dotPos.current.y - 4}px)`;
            }

            rafRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseover", checkPointer);
        document.addEventListener("mouseenter", onEnter);
        document.addEventListener("mouseleave", onLeave);
        rafRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseover", checkPointer);
            document.removeEventListener("mouseenter", onEnter);
            document.removeEventListener("mouseleave", onLeave);
            cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <>
            {/* Outer ring */}
            <div
                ref={cursorRef}
                className={`fixed top-0 left-0 pointer-events-none z-[99999] transition-all duration-200 ${isHidden ? "opacity-0" : "opacity-100"}`}
                style={{
                    width: isPointer ? "48px" : "24px",
                    height: isPointer ? "48px" : "24px",
                    border: "1.5px solid rgba(168, 85, 247, 0.7)",
                    borderRadius: "50%",
                    mixBlendMode: "normal",
                    transition: "width 0.3s ease, height 0.3s ease, opacity 0.2s ease",
                }}
            />
            {/* Inner dot */}
            <div
                ref={dotRef}
                className={`fixed top-0 left-0 pointer-events-none z-[99999] ${isHidden ? "opacity-0" : "opacity-100"}`}
                style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: "#a855f7",
                    borderRadius: "50%",
                    transition: "opacity 0.2s ease",
                }}
            />
        </>
    );
};

export default CustomCursor;
