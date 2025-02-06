import React from 'react';
import { motion } from 'framer-motion';

const CTASection = () => {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="container mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold mb-6"
        >
          Ready to Start Learning?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="text-lg mb-8"
        >
          Join thousands of learners transforming their lives with Vired's courses and training programs.
        </motion.p>
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2 }}
        >
          <a
            href="#courses"
            className="bg-secondary text-dark px-6 py-3 rounded-lg font-bold hover:bg-red-500 transition-colors duration-200"
          >
            Explore Courses
          </a>
          <a
            href="#contact"
            className="ml-4 bg-transparent text-white border-2 border-white px-6 py-3 rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-300"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
