import React from "react";
import { motion, useAnimation } from "framer-motion";
import Slider from "react-slick"; // Import the react-slick carousel
import "slick-carousel/slick/slick.css"; // Slick carousel CSS
import "slick-carousel/slick/slick-theme.css"; // Slick carousel theme CSS

// Reusable Slide Component
const Slide = ({ image, title, description, buttons }) => {
  const controls = useAnimation();

  return (
    <motion.div
      className="relative h-[80vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Parallax Background Image */}
      <motion.div
        style={{
          backgroundImage: `url(${image})`,
        }}
        className="absolute inset-0 bg-cover bg-center"
        animate={{ scale: 1.1 }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Gradient Overlay with Shifts */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
        whileHover={{
          background: "linear-gradient(to top, rgba(0,0,0,0.5), rgba(255,255,255,0.2))",
        }}
      ></motion.div>

      {/* Slide Content */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center px-4">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="text-sm md:text-base lg:text-lg mb-6"
        >
          {description}
        </motion.p>
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          {buttons.map((button, index) => (
            <a
              key={index}
              href={button.href}
              className={`${button.style} text-white px-4 py-2 md:px-6 md:py-3 rounded-lg shadow-md font-bold hover:scale-105 transition-transform duration-200`}
            >
              {button.label}
            </a>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

const HeroSection = () => {
  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    appendDots: (dots) => (
      <div style={{ bottom: "-30px" }} className="custom-dots">
        <ul className="flex justify-center gap-2">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-3 h-3 bg-primary rounded-full hover:scale-110 transition-transform"></div>
    ),
  };

  // Slide Data
  const slides = [
    {
      image: "/images/slide1.png",
      title: "Empowering Education Virtually",
      description:
        "Explore courses, trainings, and resources designed to inspire and educate in the digital age.",
      buttons: [
        { label: "Explore Now", href: "#courses", style: "bg-secondary" },
        { label: "Join Now", href: "#join", style: "bg-primary" },
      ],
    },
    {
      image: "/images/slide2.png",
      title: "Discover Data Science",
      description: "Learn how data shapes our world and build critical skills.",
      buttons: [
        { label: "Explore Now", href: "#courses", style: "bg-secondary" },
        { label: "Join Now", href: "#join", style: "bg-primary" },
      ],
    },
    {
      image: "/images/slide3.png",
      title: "Master Python Programming",
      description:
        "Build dynamic solutions and enhance your coding skills.",
      buttons: [
        { label: "Explore Now", href: "#courses", style: "bg-secondary" },
        { label: "Join Now", href: "#join", style: "bg-primary" },
      ],
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="bg-background text-textDark"
    >
      <div className="w-screen max-w-full mx-auto text-center overflow-hidden relative">
        {/* Carousel */}
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <Slide
              key={index}
              image={slide.image}
              title={slide.title}
              description={slide.description}
              buttons={slide.buttons}
            />
          ))}
        </Slider>
      </div>
    </motion.section>
  );
};

export default HeroSection;
