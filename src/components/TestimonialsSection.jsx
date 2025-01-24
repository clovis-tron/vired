import React from 'react';
import { motion } from 'framer-motion';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Jane Doe",
      photo: "https://via.placeholder.com/100",
      feedback:
        "Vired transformed my career. The courses are practical, and the instructors are amazing!",
    },
    {
      name: "John Smith",
      photo: "https://via.placeholder.com/100",
      feedback:
        "I loved the interactive learning experience. Vired made it easy to learn and grow.",
    },
    {
      name: "Emily Johnson",
      photo: "https://via.placeholder.com/100",
      feedback:
        "The creative writing course was fantastic. It gave me the confidence to publish my first book.",
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-3xl font-bold text-primary mb-6"
        >
          What Our Learners Say
        </motion.h2>
        <p className="text-lg text-textDark mb-12">
          See how Vired has made a difference in the lives of our learners.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={testimonial.photo}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-textDark mb-2">
                {testimonial.name}
              </h3>
              <p className="text-textDark">{testimonial.feedback}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
