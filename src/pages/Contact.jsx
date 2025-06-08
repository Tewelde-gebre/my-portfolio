import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contact = () => (
  <>
    <Header />
    <main className="p-8">
      <h2 className="text-2xl font-bold mb-4">Contact Me</h2>
      <p>If you'd like to get in touch, feel free to email me at <strong>example@example.com</strong>.</p>
      <form className="mt-6">
        <label className="block mb-2">Your Name</label>
        <input type="text" className="w-full p-2 border border-gray-300 rounded mb-4" />
        <label className="block mb-2">Your Email</label>
        <input type="email" className="w-full p-2 border border-gray-300 rounded mb-4" />
        <label className="block mb-2">Message</label>
        <textarea className="w-full p-2 border border-gray-300 rounded mb-4" rows="4"></textarea>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Send Message</button>
      </form>
    </main>
    <Footer />
  </>
);

export default Contact;
