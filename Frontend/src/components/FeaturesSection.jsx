import React, { useState, useEffect } from "react";

const FeaturesSection = () => {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    // Replace with your API endpoint
    fetch("https://api.example.com/features")
      .then((response) => response.json())
      .then((data) => setFeatures(data))
      .catch((error) => console.error("Error fetching features:", error));
  }, []);

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
        <p className="text-lg text-gray-600 mb-12">
          Discover features that make our platform unique.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img src={feature.icon} alt={feature.title} className="h-16 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
