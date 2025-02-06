import React, { useState } from "react";

const FAQSection = () => {
  // State to track which FAQ is open
  const [activeIndex, setActiveIndex] = useState(null);

  // FAQ data for VirEd
  const faqs = [
    {
      question: "What is VirEd?",
      answer:
        "VirEd is an educational platform offering diverse resources to help learners gain knowledge in technology, science, and various other fields.",
    },
    {
      question: "Who is VirEd for?",
      answer:
        "VirEd is designed for students, educators, corporations, and lifelong learners of all ages looking for accessible and interactive learning materials.",
    },
    {
      question: "What types of courses are available on VirEd?",
      answer:
        "VirEd offers courses in areas such as technology, coding, science, math, and more. Each course includes interactive lessons, quizzes, and downloadable materials.",
    },
    {
      question: "Are the courses free?",
      answer:
        "VirEd offers both free and premium courses. While some resources are accessible without cost, advanced and specialized content may require a subscription or one-time payment.",
    },
    {
      question: "How do I sign up for a course?",
      answer:
        "Simply create an account on the VirEd website, browse the available courses, and enroll in the ones that interest you.",
    },
    {
      question: "Can I learn at my own pace?",
      answer:
        "Yes! All courses on VirEd are self-paced, allowing you to complete lessons whenever it’s convenient.",
    },
    {
      question: "Is there support for learners?",
      answer:
        "Absolutely! VirEd offers dedicated support through our help center and discussion forums for learners to ask questions and interact with instructors.",
    },
    {
      question: "What devices can I use to access VirEd?",
      answer:
        "You can access VirEd on any device with a browser, including smartphones, tablets, laptops, and desktops.",
    },
    {
      question: "How do I contact VirEd for support or feedback?",
      answer:
        "You can reach our support team via email at support@vired.com or through the contact form on our website.",
    },
    {
      question: "What other services are you compatible with?",
      answer:
        "We are compatible with a wide range of tools and platforms to ensure seamless integration and user experience.",
    },
    {
      question: "I have a technical issue I need resolved, who do I email?",
      answer:
        "If you encounter a technical issue, please contact our support team via email at support@example.com for prompt assistance.",
    },
  ];

  // Toggle function
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`p-4 border ${
                activeIndex === index ? "bg-gray-800" : "bg-gray-700"
              } rounded-lg`}
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="font-bold">{faq.question}</h3>
                <span>
                  {activeIndex === index ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </span>
              </div>
              {activeIndex === index && (
                <p className="mt-4 text-gray-400">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
