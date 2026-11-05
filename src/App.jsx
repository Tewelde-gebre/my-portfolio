import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import ThemeProvider from "./components/ThemeProvider";
function App() {
  const STORAGE_KEY = "portfolio_profile_image";
  const [profileImage, setProfileImage] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || null;
    } catch (e) {
      return null;
    }
  });

  const handleImageUpdate = (newImage) => {
    setProfileImage(newImage);
    try {
      localStorage.setItem(STORAGE_KEY, newImage);
    } catch (error) {
      alert("Image is too large to save permanently. It will be lost on refresh.");
    }
  };

  // Smooth scroll on mount
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <CustomCursor />
        <ScrollProgress />
        <Navbar profileImage={profileImage} />
        <main className="flex-grow">
          <Hero profileImage={profileImage} onImageUpdate={handleImageUpdate} />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
