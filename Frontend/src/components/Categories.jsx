import React from "react";

const CategoriesSection = () => {
  // Array of categories
  const categories = [
    { name: "Data Science", learners: "7M+" },
    { name: "Python", learners: "46M+" },
    { name: "AI", learners: "3M+" },
    { name: "Web Development", learners: "15M+" },
    { name: "Cybersecurity", learners: "5M+" },
    { name: "Digital Marketing", learners: "12M+" },
    { name: "Cloud Computing", learners: "9M+" },
    { name: "Blockchain", learners: "2M+" },
    { name: "UI/UX Design", learners: "6M+" },
    { name: "Project Management", learners: "8M+" },
  ];

  return (
    <section id="categories" className="py-20 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Popular Categories</h2>
        <p className="text-lg text-gray-600 mb-12">
          Explore top categories and find your interest.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {category.name}
              </h3>
              <p className="text-gray-600">{category.learners} learners</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
