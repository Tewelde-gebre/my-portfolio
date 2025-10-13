import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => (
  <>
    <Header />
    <main className="p-8 text-center">
      <h2 className="text-2xl font-bold">Welcome to My Portfolio</h2>
      <p className="mt-4 text-lg">I'm a web developer specializing in React.js and JavaScript. Check out my projects!</p>
    </main>
    <Footer />
  </>
);

export default Home;
