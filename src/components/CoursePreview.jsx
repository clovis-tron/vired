import React from 'react';
import { motion } from 'framer-motion';

const CoursePreview = () => {
  const courses = [
    {
      title: "Web Development Bootcamp",
      description: "Learn to build responsive websites with HTML, CSS, and JavaScript.",
    },
    {
      title: "Data Science for Beginners",
      description: "Dive into data analysis and visualization with Python.",
    },
    {
      title: "Creative Writing Masterclass",
      description: "Unleash your creativity with techniques from top authors.",
    },
  ];

  return (
    <section id="courses" className="py-20 bg-white">
      <div className="container mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-3xl font-bold text-primary mb-6"
        >
          Explore Our Courses
        </motion.h2>
        <p className="text-lg text-textDark mb-12">
          Find the perfect course to upgrade your skills and achieve your goals.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              className="bg-background p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h3 className="text-xl font-bold text-primary mb-2">{course.title}</h3>
              <p className="text-textDark mb-4">{course.description}</p>
              <button className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-red-500 transition-colors duration-200">
                View Details
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursePreview;
