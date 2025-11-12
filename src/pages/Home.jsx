import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";

import slide1 from "../assets/pexels-tranmautritam-326503.jpg";
import slide2 from "../assets/download.jpeg";
import slide3 from "../assets/gd.jpeg";
import slide4 from "../assets/ph.jpeg";
import slide5 from "../assets/wariting.jpeg";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const categories = [
    "Web Development",
    "Graphic Design",
    "Digital Marketing",
    "Content Writing",
    "App Development",
    "UI/UX Design",
    "SEO Optimization",
    "Video Editing"
  ];

  useEffect(() => {
    fetch("http://localhost:5000/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/category/${encodeURIComponent(category)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Swiper Section */}
      <section className="mb-12">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000 }}
          modules={[Autoplay]}
        >
          {[slide1, slide2, slide3, slide4, slide5].map((slide, idx) => (
            <SwiperSlide key={idx}>
              <div
                className="h-[400px] flex flex-col justify-center items-center text-white rounded-lg bg-cover bg-center"
                style={{ backgroundImage: `url(${slide})` }}
              >
                <h2 className="text-3xl font-bold bg-black/50 px-4 py-2 rounded-lg">
                  {["Find the Right Freelancer","Work Anytime, Anywhere","Grow Your Skills","Hire Top Professionals","Build Your Dream Career"][idx]}
                </h2>
                <p className="mt-2 bg-black/40 px-3 py-1 rounded-md">
                  {["Post your task and get it done quickly!",
                    "Remote freelancing at your fingertips",
                    "Join our community and earn more",
                    "Connect with verified experts in minutes",
                    "Turn your passion into income today"][idx]}
                </p>
                <button className={`btn mt-4 ${["btn-primary","btn-secondary","btn-accent","btn-info","btn-success"][idx]}`}>
                  {["Get Started","Browse Tasks","Join Now","Hire Now","Start Now"][idx]}
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Top Categories */}
      <section className="mb-12 px-6">
        <h2 className="text-2xl font-bold text-center mb-6">Top Categories</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => handleCategoryClick(cat)}
              className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow text-center cursor-pointer hover:scale-105 transition-transform"
            >
              <h3 className="font-semibold">{cat}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mb-12 px-6">
        <h2 className="text-2xl font-bold text-center mb-6">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
            <h3 className="font-semibold text-lg">Trusted Platform</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Thousands of verified freelancers ready to work
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
            <h3 className="font-semibold text-lg">Secure Payments</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Safe and easy payment system for both clients and freelancers
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
            <h3 className="font-semibold text-lg">24/7 Support</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Our team is here to help you anytime
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
