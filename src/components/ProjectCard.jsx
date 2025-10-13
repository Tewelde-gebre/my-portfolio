import React from 'react';

const ProjectCard = ({ title, description, link, image }) => (
  <div className="border p-4 rounded-lg shadow-lg hover:shadow-2xl transition">
    {image && <img src={image} alt={title} className="mb-4 rounded-md" />}
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="mb-4">{description}</p>
    <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
      View Project
    </a>
  </div>
);

export default ProjectCard;
