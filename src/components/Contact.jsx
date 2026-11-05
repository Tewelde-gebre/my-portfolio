import { useState, useRef, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";
import {
    FaEnvelope, FaMapMarkerAlt, FaPaperPlane,
    FaPhone, FaCopy, FaCheck,
    FaGithub, FaLinkedin, FaTelegram,
} from "react-icons/fa";
import { HiCheckCircle, HiXCircle } from "react-icons/hi2";

// ── FormSubmit — zero-config email service (no account/keys needed) ──────────
// On the very first submission, FormSubmit will send a ONE-TIME confirmation
// email to teweldegebre71@gmail.com. Click the link in that email, and all
// future submissions will land directly in your inbox.
const FORMSUBMIT_EMAIL = "teweldegebre71@gmail.com";

const MAX_MSG = 500;

const validate = (name, value) => {
    if (name === "name")    return value.trim().length >= 2 ? "" : "Name must be at least 2 characters";
    if (name === "email")   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Enter a valid email address";
    if (name === "message") return value.trim().length >= 10 ? "" : "Message must be at least 10 characters";
    return "";
};

/* ─── FloatingInput ─── */
const FloatingInput = ({
    id, name, type = "text",
    value, onChange, onFocus, onBlur,
    label, required, error, touched, isFocused,
}) => {
    const hasValue = value.length > 0;
    const isValid  = touched && !error && hasValue;
    const isError  = touched && !!error;
    const floated  = hasValue || isFocused;

    const borderColor = isError ? "rgba(239,68,68,0.6)" : isValid ? "rgba(34,197,94,0.5)" : undefined;
    const boxShadow   = isError ? "0 0 0 4px rgba(239,68,68,0.08)" : isValid ? "0 0 0 4px rgba(34,197,94,0.08)" : undefined;

    const labelStyle = floated
        ? {
              position: "absolute",
              left: "1.25rem",
              top: "0.4rem",
              fontSize: "0.72rem",
              color: isFocused ? "#c084fc" : "rgba(255,255,255,0.55)",
              pointerEvents: "none",
              transition: "top 0.22s ease, font-size 0.22s ease, color 0.22s ease",
              zIndex: 2,
              fontWeight: 600,
              letterSpacing: "0.02em",
          }
        : {
              position: "absolute",
              left: "1.25rem",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "0.95rem",
              color: "rgba(255,255,255,0.38)",
              pointerEvents: "none",
              transition: "top 0.22s ease, font-size 0.22s ease, color 0.22s ease, transform 0.22s ease",
              zIndex: 2,
          };

    return (
        <div style={{ position: "relative" }}>
            <div style={{ position: "relative" }}>
                <input
                    type={type}
                    id={id}
                    name={name}
                    required={required}
                    value={value}
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder=" "
                    className="input-float"
                    style={{ borderColor, boxShadow }}
                />
                <label htmlFor={id} style={labelStyle}>
                    {label}
                    {required && <span style={{ color: "#c084fc", marginLeft: 2 }}>*</span>}
                </label>

                {(isValid || isError) && (
                    <div style={{
                        position: "absolute", right: "1rem",
                        top: "50%", transform: "translateY(-50%)",
                        pointerEvents: "none",
                    }}>
                        {isValid
                            ? <HiCheckCircle size={20} style={{ color: "#4ade80" }} />
                            : <HiXCircle    size={20} style={{ color: "#f87171" }} />}
                    </div>
                )}
            </div>

            <AnimatePresence>
                {isError && (
                    <motion.p
                        key="err"
                        initial={{ opacity: 0, y: -4, height: 0 }}
                        animate={{ opacity: 1, y: 0,  height: "auto" }}
                        exit   ={{ opacity: 0, y: -4, height: 0 }}
                        style={{
                            color: "#f87171", fontSize: "0.73rem",
                            marginTop: "0.4rem", marginLeft: "0.25rem",
                            fontWeight: 600, display: "flex",
                            alignItems: "center", gap: "0.3rem",
                        }}
                    >
                        <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#f87171", display: "inline-block", flexShrink: 0 }} />
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
};

/* ─── Contact Section ─── */
const Contact = () => {
    const DRAFT_KEY = "portfolio_contact_draft";

    const [formData, setFormData] = useState(() => {
        try {
            const saved = localStorage.getItem(DRAFT_KEY);
            return saved ? JSON.parse(saved) : { name: "", email: "", subject: "", message: "" };
        } catch {
            return { name: "", email: "", subject: "", message: "" };
        }
    });

    useEffect(() => {
        try { localStorage.setItem(DRAFT_KEY, JSON.stringify(formData)); } catch { /* ignore */ }
    }, [formData]);

    const [errors,       setErrors]       = useState({});
    const [touched,      setTouched]      = useState({});
    const [status,       setStatus]       = useState("");   // "" | "sending" | "success" | "error"
    const [focusedField, setFocusedField] = useState(null);
    const [copiedEmail,  setCopiedEmail]  = useState(false);
    const [isTyping,     setIsTyping]     = useState(false);
    const typingTimer = useRef(null);
    const formRef     = useRef(null);
    const [mousePos,  setMousePos]        = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!formRef.current) return;
        const rect = formRef.current.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleClear = () => {
        setFormData({ name: "", email: "", subject: "", message: "" });
        localStorage.removeItem(DRAFT_KEY);
        setTouched({});
        setErrors({});
        setFocusedField(null);
    };

    const hasDraftData = Object.values(formData).some(v => v.length > 0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "message" && value.length > MAX_MSG) return;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (touched[name]) setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
        if (name === "message") {
            setIsTyping(true);
            clearTimeout(typingTimer.current);
            typingTimer.current = setTimeout(() => setIsTyping(false), 1000);
        }
    };

    const handleFocus = (fieldName) => setFocusedField(fieldName);

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setFocusedField(null);
        setTouched(prev => ({ ...prev, [name]: true }));
        setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTouched = { name: true, email: true, message: true };
        const newErrors  = {
            name:    validate("name",    formData.name),
            email:   validate("email",   formData.email),
            message: validate("message", formData.message),
        };
        setTouched(newTouched);
        setErrors(newErrors);
        if (Object.values(newErrors).some(Boolean)) return;

        setStatus("sending");

        try {
            const data = new FormData();
            data.append("name",    formData.name);
            data.append("email",   formData.email);
            data.append("subject", formData.subject || `[Portfolio] Message from ${formData.name}`);
            data.append("message", formData.message);
            data.append("_replyto", formData.email);
            data.append("_subject", formData.subject || `[Portfolio] Message from ${formData.name}`);
            data.append("_captcha", "false");
            data.append("_template", "table");

            const res = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_EMAIL}`, {
                method:  "POST",
                headers: { Accept: "application/json" },
                body:    data,
            });

            const json = await res.json();
            if (json.success === "true" || json.success === true) {
                setStatus("success");
                handleClear();
            } else {
                throw new Error(json.message || "Submission failed");
            }
        } catch (err) {
            console.error("FormSubmit error:", err);
            setStatus("error");
        }
    };

    const copyEmail = () => {
        navigator.clipboard.writeText("teweldegebre71@gmail.com").then(() => {
            setCopiedEmail(true);
            setTimeout(() => setCopiedEmail(false), 2000);
        });
    };

    const contactInfo = [
        { icon: <FaEnvelope />,    label: "Email",    value: "teweldegebre71@gmail.com", href: "mailto:teweldegebre71@gmail.com", color: "#6366f1", copyable: true },
        { icon: <FaPhone />,       label: "Phone",    value: "+251 954 365 786",          href: "tel:+251954365786",              color: "#a855f7" },
        { icon: <FaMapMarkerAlt />,label: "Location", value: "Mekelle, Ethiopia",         href: null,                             color: "#ec4899" },
    ];

    const socials = [
        { icon: <FaGithub   size={18} />, href: "https://github.com/Tewelde-gebre", label: "GitHub"   },
        { icon: <FaLinkedin size={18} />, href: "#",                                 label: "LinkedIn" },
        { icon: <FaTelegram size={18} />, href: "#",                                 label: "Telegram" },
    ];

    const msgLen = formData.message.length;
    const msgPct = msgLen / MAX_MSG;

    const msgBorder = touched.message && errors.message
        ? "rgba(239,68,68,0.6)"
        : touched.message && !errors.message && formData.message
        ? "rgba(34,197,94,0.5)"
        : undefined;

    const msgShadow = touched.message && errors.message
        ? "0 0 0 4px rgba(239,68,68,0.08)"
        : touched.message && !errors.message && formData.message
        ? "0 0 0 4px rgba(34,197,94,0.08)"
        : undefined;

    const msgFloated = formData.message.length > 0 || focusedField === "message";
    const msgLabelStyle = msgFloated
        ? {
              position: "absolute",
              left: "1.25rem",
              top: "0.4rem",
              fontSize: "0.72rem",
              color: focusedField === "message" ? "#c084fc" : "rgba(255,255,255,0.55)",
              pointerEvents: "none",
              transition: "top 0.22s ease, font-size 0.22s ease, color 0.22s ease",
              zIndex: 2,
              fontWeight: 600,
              letterSpacing: "0.02em",
          }
        : {
              position: "absolute",
              left: "1.25rem",
              top: "0.9rem",
              fontSize: "0.95rem",
              color: "rgba(255,255,255,0.38)",
              pointerEvents: "none",
              transition: "top 0.22s ease, font-size 0.22s ease, color 0.22s ease",
              zIndex: 2,
          };

    return (
        <section id="contact" style={{ position: "relative", padding: "8rem 0", overflow: "hidden" }}>
            {/* Background orbs */}
            <div className="orb" style={{ width: 500, height: 500, bottom: 0, left: -150, opacity: 0.15, background: "radial-gradient(circle, #6366f1 0%, transparent 70%)" }} />
            <div className="orb" style={{ width: 400, height: 400, top: 0, right: -100, opacity: 0.10, background: "radial-gradient(circle, #ec4899 0%, transparent 70%)" }} />

            <div className="section-container" style={{ position: "relative", zIndex: 10 }}>

                {/* ── Section Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    style={{ marginBottom: "5rem" }}
                >
                    <div className="section-label">Contact</div>
                    <h2 className="section-title">
                        Let's <span className="text-gradient">Connect</span>
                    </h2>
                    <p style={{ color: "#a1a1aa", fontSize: "1.1rem", maxWidth: "38rem", lineHeight: 1.8 }}>
                        Have a project in mind? I'd love to hear about it. Drop a message and let's create something extraordinary.
                    </p>
                </motion.div>

                {/* ── Two-column layout ── */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
                    gap: "2.5rem",
                    alignItems: "start",
                }}>
                    {/* ── Left: info + socials ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
                    >
                        {/* Contact info card */}
                        <div className="glass-card" style={{ padding: "2rem", position: "relative", overflow: "hidden" }}>
                            {/* Top accent */}
                            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(to right, #a855f7, #6366f1, transparent)" }} />

                            <h3 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#fff", marginBottom: "0.5rem" }}>
                                Get in Touch
                            </h3>
                            <p style={{ color: "#71717a", fontSize: "0.875rem", lineHeight: 1.75, marginBottom: "2rem" }}>
                                I'm always open to discussing new projects, creative ideas, or opportunities.
                            </p>

                            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                                {contactInfo.map((info, i) => (
                                    <motion.div key={i} whileHover={{ x: 6 }}
                                        style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                        {/* Icon bubble */}
                                        <div style={{
                                            width: 44, height: 44, borderRadius: "0.75rem", flexShrink: 0,
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            background: `${info.color}20`, border: `1px solid ${info.color}40`, color: info.color,
                                        }}>
                                            {info.icon}
                                        </div>

                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <p style={{ color: "#52525b", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>
                                                {info.label}
                                            </p>
                                            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                                                {info.href ? (
                                                    <a href={info.href}
                                                        style={{ color: "#e4e4e7", fontSize: "0.875rem", fontWeight: 600, textDecoration: "none", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", transition: "color 0.2s" }}
                                                        onMouseEnter={e => e.currentTarget.style.color = "#c084fc"}
                                                        onMouseLeave={e => e.currentTarget.style.color = "#e4e4e7"}>
                                                        {info.value}
                                                    </a>
                                                ) : (
                                                    <span style={{ color: "#e4e4e7", fontSize: "0.875rem", fontWeight: 600 }}>{info.value}</span>
                                                )}

                                                {info.copyable && (
                                                    <motion.button onClick={copyEmail} whileTap={{ scale: 0.85 }} title="Copy email"
                                                        style={{ padding: "0.2rem 0.35rem", borderRadius: "0.4rem", border: "none", background: "transparent", cursor: "pointer", color: "#52525b", display: "flex", alignItems: "center", transition: "color 0.2s, background 0.2s" }}
                                                        onMouseEnter={e => { e.currentTarget.style.color = "#c084fc"; e.currentTarget.style.background = "rgba(168,85,247,0.1)"; }}
                                                        onMouseLeave={e => { e.currentTarget.style.color = "#52525b";  e.currentTarget.style.background = "transparent"; }}>
                                                        <AnimatePresence mode="wait">
                                                            {copiedEmail
                                                                ? <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><FaCheck size={11} style={{ color: "#4ade80" }} /></motion.span>
                                                                : <motion.span key="copy"  initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><FaCopy  size={11} /></motion.span>
                                                            }
                                                        </AnimatePresence>
                                                    </motion.button>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Copy toast */}
                            <AnimatePresence>
                                {copiedEmail && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                                        style={{
                                            position: "absolute", bottom: "1rem", left: "50%", transform: "translateX(-50%)",
                                            padding: "0.45rem 1rem", background: "rgba(34,197,94,0.15)",
                                            border: "1px solid rgba(34,197,94,0.3)", borderRadius: "0.75rem",
                                            color: "#4ade80", fontSize: "0.75rem", fontWeight: 600, whiteSpace: "nowrap",
                                        }}>
                                        ✓ Email copied!
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Social links card */}
                        <div className="glass-card" style={{ padding: "1.5rem" }}>
                            <p style={{ color: "#71717a", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem" }}>
                                Find me on
                            </p>
                            <div style={{ display: "flex", gap: "0.75rem" }}>
                                {socials.map(s => (
                                    <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                                        whileHover={{ y: -4, scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                        style={{
                                            flex: 1, padding: "0.75rem", borderRadius: "0.75rem",
                                            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            color: "#71717a", textDecoration: "none",
                                            transition: "color 0.25s, background 0.25s, border-color 0.25s",
                                        }}
                                        onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "rgba(255,255,255,0.09)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; }}
                                        onMouseLeave={e => { e.currentTarget.style.color = "#71717a"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}>
                                        {s.icon}
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* ── Right: Form card ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <div
                            ref={formRef}
                            onMouseMove={handleMouseMove}
                            className="glass-card"
                            style={{ padding: "2.5rem", position: "relative", overflow: "hidden" }}
                        >
                            {/* Top accent line */}
                            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(to right, transparent, #a855f7, transparent)", zIndex: 10 }} />

                            {/* Spotlight glow */}
                            <div style={{
                                pointerEvents: "none", position: "absolute", inset: -1,
                                borderRadius: "1.5rem", zIndex: 0,
                                background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(139,92,246,0.07), transparent 40%)`,
                            }} />

                            <AnimatePresence mode="wait">

                                {/* ─ Success ─ */}
                                {status === "success" ? (
                                    <motion.div key="success"
                                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                                        style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "4rem 0", textAlign: "center", gap: "1rem", position: "relative", zIndex: 10 }}>
                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.1 }}>
                                            <HiCheckCircle size={64} style={{ color: "#4ade80" }} />
                                        </motion.div>
                                        <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff" }}>Message Sent!</h3>
                                        <p style={{ color: "#71717a", fontSize: "0.875rem", maxWidth: "20rem" }}>
                                            Your message has been sent directly to my inbox. I'll get back to you soon!
                                        </p>
                                    </motion.div>

                                ) : status === "error" ? (

                                    /* ─ Error ─ */
                                    <motion.div key="error"
                                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                                        style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "4rem 0", textAlign: "center", gap: "1rem", position: "relative", zIndex: 10 }}>
                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.1 }}>
                                            <HiXCircle size={64} style={{ color: "#f87171" }} />
                                        </motion.div>
                                        <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff" }}>Oops! Something went wrong</h3>
                                        <p style={{ color: "#71717a", fontSize: "0.875rem", maxWidth: "22rem", lineHeight: 1.7 }}>
                                            The message couldn't be sent. Please try again, or reach out directly via email.
                                        </p>
                                        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
                                            <motion.button className="btn-primary"
                                                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                                style={{ padding: "0.65rem 1.25rem", fontSize: "0.875rem" }}
                                                onClick={() => setStatus("")}>
                                                Try Again
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                                style={{
                                                    padding: "0.65rem 1.25rem", fontSize: "0.875rem",
                                                    borderRadius: "0.875rem", border: "1px solid rgba(255,255,255,0.15)",
                                                    background: "transparent", color: "#d4d4d8", cursor: "pointer",
                                                    display: "flex", alignItems: "center", gap: "0.4rem", fontFamily: "inherit",
                                                }}
                                                onClick={() => {
                                                    const subject = encodeURIComponent(`[Portfolio] Message from ${formData.name}`);
                                                    const body    = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
                                                    window.open(`mailto:teweldegebre71@gmail.com?subject=${subject}&body=${body}`);
                                                }}>
                                                <FaEnvelope size={13} /> Email directly
                                            </motion.button>
                                        </div>
                                        <button onClick={() => setStatus("")}
                                            style={{ background: "none", border: "none", cursor: "pointer", color: "#52525b", fontSize: "0.75rem", textDecoration: "underline", marginTop: "0.25rem", transition: "color 0.2s" }}
                                            onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                                            onMouseLeave={e => e.currentTarget.style.color = "#52525b"}>
                                            Go Back
                                        </button>
                                    </motion.div>

                                ) : (

                                    /* ─ Form ─ */
                                    <motion.form key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        onSubmit={handleSubmit} noValidate
                                        style={{ display: "flex", flexDirection: "column", gap: "1.25rem", position: "relative", zIndex: 10 }}>

                                        {/* Name + Email row */}
                                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}
                                             className="contact-form-row">
                                            <FloatingInput
                                                id="name" name="name" label="Your Name" required
                                                value={formData.name} error={errors.name} touched={touched.name}
                                                isFocused={focusedField === "name"}
                                                onChange={handleChange}
                                                onFocus={() => handleFocus("name")}
                                                onBlur={handleBlur}
                                            />
                                            <FloatingInput
                                                id="email" name="email" type="email" label="Email Address" required
                                                value={formData.email} error={errors.email} touched={touched.email}
                                                isFocused={focusedField === "email"}
                                                onChange={handleChange}
                                                onFocus={() => handleFocus("email")}
                                                onBlur={handleBlur}
                                            />
                                        </div>

                                        {/* Subject */}
                                        <FloatingInput
                                            id="subject" name="subject" label="Subject"
                                            value={formData.subject} error={errors.subject} touched={touched.subject}
                                            isFocused={focusedField === "subject"}
                                            onChange={handleChange}
                                            onFocus={() => handleFocus("subject")}
                                            onBlur={handleBlur}
                                        />

                                        {/* Message + counter */}
                                        <div>
                                            <div style={{ position: "relative" }}>
                                                <textarea
                                                    id="message" name="message" required rows={6}
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    onFocus={() => handleFocus("message")}
                                                    onBlur={handleBlur}
                                                    placeholder=" "
                                                    className="input-float"
                                                    style={{ resize: "none", borderColor: msgBorder, boxShadow: msgShadow }}
                                                />
                                                <label htmlFor="message" style={msgLabelStyle}>
                                                    Message<span style={{ color: "#c084fc", marginLeft: 2 }}>*</span>
                                                </label>

                                                {/* Typing dots */}
                                                <AnimatePresence>
                                                    {isTyping && focusedField === "message" && (
                                                        <motion.div
                                                            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                                                            style={{ position: "absolute", bottom: "3.5rem", right: "0.75rem", display: "flex", alignItems: "center", gap: "0.2rem", padding: "0.35rem 0.6rem", background: "#27272a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0.5rem" }}>
                                                            {[0, 1, 2].map(i => (
                                                                <motion.span key={i}
                                                                    animate={{ y: [0, -4, 0] }}
                                                                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
                                                                    style={{ width: 6, height: 6, borderRadius: "50%", background: "#c084fc", display: "block" }} />
                                                            ))}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>

                                            {/* Message error */}
                                            <AnimatePresence>
                                                {touched.message && errors.message && (
                                                    <motion.p
                                                        initial={{ opacity: 0, y: -4, height: 0 }} animate={{ opacity: 1, y: 0, height: "auto" }} exit={{ opacity: 0, y: -4, height: 0 }}
                                                        style={{ color: "#f87171", fontSize: "0.73rem", marginTop: "0.4rem", marginLeft: "0.25rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.3rem" }}>
                                                        <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#f87171", display: "inline-block", flexShrink: 0 }} />
                                                        {errors.message}
                                                    </motion.p>
                                                )}
                                            </AnimatePresence>

                                            {/* Character counter */}
                                            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "0.35rem" }}>
                                                <motion.span
                                                    animate={{ color: msgPct > 0.9 ? "#f87171" : msgPct > 0.7 ? "#fbbf24" : "#52525b" }}
                                                    style={{ fontSize: "0.73rem", fontFamily: "var(--font-mono)" }}>
                                                    {msgLen}/{MAX_MSG}
                                                </motion.span>
                                            </div>
                                        </div>

                                        {/* Action buttons */}
                                        <div style={{ display: "flex", gap: "0.875rem", marginTop: "0.25rem" }}>
                                            {hasDraftData && (
                                                <motion.button type="button" onClick={handleClear}
                                                    whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}
                                                    style={{
                                                        flex: "0 0 32%", padding: "0.9rem", borderRadius: "0.875rem",
                                                        border: "1px solid rgba(255,255,255,0.1)",
                                                        background: "rgba(255,255,255,0.05)",
                                                        color: "#d4d4d8", cursor: "pointer",
                                                        fontWeight: 600, fontSize: "0.875rem",
                                                        display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem",
                                                        transition: "background 0.2s, color 0.2s",
                                                        fontFamily: "inherit",
                                                    }}
                                                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#fff"; }}
                                                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#d4d4d8"; }}>
                                                    <HiXCircle size={17} /> Clear
                                                </motion.button>
                                            )}

                                            <motion.button type="submit" disabled={status === "sending"}
                                                whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}
                                                className="btn-primary"
                                                style={{ flex: 1, padding: "0.9rem", fontSize: "1rem", justifyContent: "center" }}>
                                                <span style={{ display: "flex", alignItems: "center", gap: "0.5rem", justifyContent: "center" }}>
                                                    {status === "sending" ? (
                                                        <>
                                                            <motion.div
                                                                animate={{ rotate: 360 }}
                                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                                style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%" }} />
                                                            Sending...
                                                        </>
                                                    ) : (
                                                        <>Send Message <FaPaperPlane size={14} /></>
                                                    )}
                                                </span>
                                            </motion.button>
                                        </div>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scoped responsive styles */}
            <style>{`
                @media (min-width: 900px) {
                    #contact .contact-grid-inner {
                        grid-template-columns: 2fr 3fr;
                    }
                }
                @media (max-width: 540px) {
                    .contact-form-row {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default Contact;
