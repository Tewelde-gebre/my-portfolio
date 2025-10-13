import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => (
  <>
    <Header />
    <main className="p-8">
      <h2 className="text-2xl font-bold mb-4">About Me</h2>
      <p>
        I’m a passionate web developer with experience in React.js, JavaScript, HTML, CSS, and more. I enjoy building interactive user interfaces and creating seamless web applications.
      </p>
      <p className="mt-4">
        I specialize in React development and building dynamic applications that focus on performance, scalability, and user experience.
      </p>
    </main>
    <Footer />
  </>
);

export default About;
