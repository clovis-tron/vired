import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const CourseCatalog = () => {
  const navigate = useNavigate(); // Hook to navigate between routes

  // Sample data for courses
  const courses = [
    {
      id: 1,
      title: "Fundamental Of UI/UX Design",
      description: "Some quick example text to build on the card title and make up the bulk of the card.",
      price: "200,000 RWF",
      image: "/images/ui.avif", // Replace with the correct image path
    },
    {
      id: 2,
      title: "Advanced Graphic Design",
      description: "Learn advanced concepts in graphic design to create stunning visuals.",
      price: "300,000 RWF",
      image: "/images/graphic.jpg", // Replace with the correct image path
    },
    {
      id: 3,
      title: "Web Development Bootcamp",
      description: "Master the skills required to build responsive and modern websites.",
      price: "400,000 RWF",
      image: "/images/webdev.jpg", // Replace with the correct image path
    },
    {
      id: 4,
      title: "Data Science Essentials",
      description: "Explore the world of data analysis, visualization, and machine learning.",
      price: "500,000 RWF",
      image: "/images/datascience.jpg", // Replace with the correct image path
    },
    {
      id: 5,
      title: "Digital Marketing Strategies",
      description: "Learn to create and execute impactful digital marketing campaigns.",
      price: "250,000 RWF",
      image: "/images/digital.avif", // Replace with the correct image path
    },
    {
      id: 6,
      title: "Mobile App Development",
      description: "Build interactive mobile applications for iOS and Android platforms.",
      price: "450,000 RWF",
      image: "/images/Mobile.avif", // Replace with the correct image path
    },
  ];

  const handleCourseClick = (id) => {
    navigate(`/classroom/${id}`); // Navigate to the Classroom page with the course ID
  };

  return (
    <div className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold mb-8">
          Choose Your Desired Course
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
              onClick={() => handleCourseClick(course.id)} // Handle click to navigate
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-sm mb-4">{course.description}</p>
                <p className="text-orange-500 font-bold">Price: {course.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseCatalog;
