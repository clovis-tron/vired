import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto text-center">
        {/* Logo */}
        <div className="mb-4">
          <img src="/Images/logo.svg" alt="Vired Logo" className="h-10 mx-auto" />
        </div>
        
        <h3 className="text-xl font-bold mb-4">Vired</h3>
        <p className="text-sm mb-6">
          Empowering education virtually. © {new Date().getFullYear()} Vired. All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex justify-center space-x-6 mb-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            <FaInstagram size={24} />
          </a>
        </div>

        {/* Footer Links */}
        <div className="text-sm">
          <a href="#features" className="hover:text-primary mx-2">
            Features
          </a>
          <a href="#courses" className="hover:text-primary mx-2">
            Courses
          </a>
          <a href="#contact" className="hover:text-primary mx-2">
            Contact
          </a>
          <a href="#about" className="hover:text-primary mx-2">
            About
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
