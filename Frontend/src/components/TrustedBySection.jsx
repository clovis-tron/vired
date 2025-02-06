import React from "react";

const TrustedBySection = () => {
  // List of company logos
  const companies = [
    { name: "Coursera", src: "/Images/coursera.png", alt: "Coursera Logo" },
    { name: "Udemy", src: "/Images/udemy.png", alt: "Udemy Logo" },
    { name: "Education", src: "/Images/education.png", alt: "Education Logo" },
    { name: "Indeed", src: "/Images/indeed.png", alt: "Indeed Logo" },
  ];

  return (
    <section className="py-10 bg-gray-900 text-white">
      <div className="container mx-auto text-center">
        {/* Title */}
        <h2 className="text-3xl font-bold mb-8">
          Trusted by over <span className="text-primary">800+ companies</span>
        </h2>
        {/* Logos */}
        <div className="flex flex-wrap justify-center items-center gap-6 max-w-4xl mx-auto">
          {companies.map((company, index) => (
            <img
              key={index}
              src={company.src}
              alt={company.alt}
              className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition duration-200"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
