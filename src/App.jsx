import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  const STORAGE_KEY = "portfolio_profile_image";
  const [profileImage, setProfileImage] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || null;
    } catch (e) {
      console.error("Failed to load image from storage", e);
      return null;
    }
  });

  const handleImageUpdate = (newImage) => {
    setProfileImage(newImage);
    try {
      localStorage.setItem(STORAGE_KEY, newImage);
    } catch (error) {
      console.error("Failed to save image to localStorage:", error);
      alert("Image is too large to save permanently. It will be lost on refresh.");
    }
  };

  return (
    <div className="text-gray-900 min-h-screen">
      <Navbar profileImage={profileImage} />
      <Routes>
        <Route path="/" element={<Hero profileImage={profileImage} onImageUpdate={handleImageUpdate} />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
