import React from "react";

const ExploreSection = () => {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Left Side: Image */}
        <div className="flex-1">
          <img
            src="/Images/slide2.png" // Replace with your actual image path
            alt="E-Learning"
            className="rounded-lg shadow-lg w-full"
          />
        </div>

        {/* Right Side: Content */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-6">Explore The E-Learning Institute</h2>
          <p className="text-gray-400 mb-8">
            There are many variations of passages of Lorem Ipsum available, but the majority have suffered
            alteration in some form, by injected humour, or randomised words which don’t look even slightly
            believable. If you are going to use a passage of Lorem Ipsum, you need to be sure.
          </p>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold">3.2K+</h3>
              <p className="text-gray-400">Online Course</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold">600+</h3>
              <p className="text-gray-400">Expert Member</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold">1k+</h3>
              <p className="text-gray-400">Rating & Review</p>
            </div>
          </div>
          <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors">
            Read More
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;
