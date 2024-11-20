import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10 mt-12">
      <div className="max-w-screen-xl mx-auto px-6 text-center sm:text-left">
        {/* Footer Top Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start">
          {/* Logo and Brand Name */}
          <div className="mb-6 sm:mb-0">
            <h1 className="text-3xl font-bold text-blue-500">Your Health App</h1>
            <p className="mt-2 text-gray-400">Track your health journey with us</p>
          </div>

          {/* Footer Links */}
          <div className="flex space-x-6 mb-6 sm:mb-0">
            <Link to="/about" className="text-white hover:text-gray-400">About</Link>
            <Link to="/privacy-policy" className="text-white hover:text-gray-400">Privacy Policy</Link>
            <Link to="/contact" className="text-white hover:text-gray-400">Contact</Link>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="border-t border-gray-600 pt-6 mt-6">
          <div className="flex justify-center space-x-8 mb-4">
            {/* Social Media Icons */}
            <a href="https://facebook.com" className="text-white hover:text-blue-500">
              <i className="fab fa-facebook-f text-2xl"></i>
            </a>
            <a href="https://twitter.com" className="text-white hover:text-blue-400">
              <i className="fab fa-twitter text-2xl"></i>
            </a>
            <a href="https://instagram.com" className="text-white hover:text-pink-400">
              <i className="fab fa-instagram text-2xl"></i>
            </a>
            <a href="https://linkedin.com" className="text-white hover:text-blue-600">
              <i className="fab fa-linkedin-in text-2xl"></i>
            </a>
          </div>

          {/* Copyright and Additional Info */}
          <p className="text-sm text-gray-400">
            © 2024 Your Health App. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
