import React from 'react';

const Footer = () => (
  <footer className="bg-gray-800 text-white p-4 text-center mt-8">
    <p>&copy; 2025 My Portfolio. All rights reserved.</p>
    <ul className="flex justify-center space-x-4">
      <li>
        <a href="https://github.com/Tewelde-gebre" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">GitHub</a>
      </li>
      <li>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">LinkedIn</a>
      </li>
    </ul>
  </footer>
);

export default Footer;
