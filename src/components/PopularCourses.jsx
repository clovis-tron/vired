import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const PopularCourses = () => {
  const courses = [
    {
      id: 1,
      image: "/images/slide2.png",
      title: "Fundamental Of UI/UX Design",
      description: "Some quick example text to build on the card title and make up the bulk of the card.",
      price: "200,000 RWF",
    },
    {
      id: 2,
      image: "/images/slide1.png",
      title: "Fundamental Of UI/UX Design",
      description: "Some quick example text to build on the card title and make up the bulk of the card.",
      price: "200,000 RWF",
    },
    {
      id: 3,
      image: "/images/slide3.png",
      title: "Fundamental Of UI/UX Design",
      description: "Some quick example text to build on the card title and make up the bulk of the card.",
      price: "200,000 RWF",
    },
    {
      id: 4,
      image: "/images/slide1.png",
      title: "Fundamental Of UI/UX Design",
      description: "Some quick example text to build on the card title and make up the bulk of the card.",
      price: "200,000 RWF",
    },
    {
      id: 5,
      image: "/images/slide3.png",
      title: "Fundamental Of UI/UX Design",
      description: "Some quick example text to build on the card title and make up the bulk of the card.",
      price: "200,000 RWF",
    },
    {
      id: 6,
      image: "/images/slide2.png",
      title: "Fundamental Of UI/UX Design",
      description: "Some quick example text to build on the card title and make up the bulk of the card.",
      price: "200,000 RWF",
    },
  ];

  return (
    <section id="popular-courses" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Discover Our Popular Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                <p className="text-gray-400 mb-4">{course.description}</p>
                <p className="text-orange-500 font-bold mb-4">Price: {course.price}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
        <Link to="/courses">
          <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors">
            See More Courses
          </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;
