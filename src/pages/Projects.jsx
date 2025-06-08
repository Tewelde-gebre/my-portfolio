import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';

const Projects = () => {
  const projects = [
    {
      title: 'Portfolio Website',
      description: 'A personal portfolio website showcasing my skills and projects.',
      link: 'https://github.com/my-portfolio',
      image: 'https://via.placeholder.com/400'
    },
    {
      title: 'E-commerce Website',
      description: 'A full-fledged e-commerce website with user authentication and product management.',
      link: 'https://github.com/my-ecommerce',
      image: 'https://via.placeholder.com/400'
    },
    // Add more projects as needed
  ];

  return (
    <>
      <Header />
      <main className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </main>
      <Footer />
    </>
  );
};

export default Projects;
