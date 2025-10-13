import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="bg-gray-800 text-white p-4 text-center">
    <h1 className="text-3xl font-bold">My Portfolio</h1>
    <nav>
      <ul className="flex justify-center space-x-6 mt-4">
        <li>
          <Link to="/" className="text-lg hover:text-gray-400">Home</Link>
        </li>
        <li>
          <Link to="/about" className="text-lg hover:text-gray-400">About</Link>
        </li>
        <li>
          <Link to="/projects" className="text-lg hover:text-gray-400">Projects</Link>
        </li>
        <li>
          <Link to="/contact" className="text-lg hover:text-gray-400">Contact</Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
