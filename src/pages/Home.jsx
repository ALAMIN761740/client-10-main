import React, { useMemo } from "react";
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
  const navigate = useNavigate();

  const categories = useMemo(
    () => [
      "Web Development",
      "Graphic Design",
      "Digital Marketing",
      "Content Writing",
      "App Development",
      "UI/UX Design",
      "SEO Optimization",
      "Video Editing",
    ],
    []
  );

  const handleCategoryClick = (category) => {
    navigate(`/browse-tasks/${encodeURIComponent(category)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Swiper */}
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
                className="h-[420px] flex flex-col justify-center items-center text-white rounded-lg bg-cover bg-center"
                style={{ backgroundImage: `url(${slide})` }}
              >
                <h2 className="text-3xl font-extrabold bg-black/50 px-6 py-3 rounded-lg">
                  {[
                    "Find the Right Freelancer",
                    "Work Anytime, Anywhere",
                    "Grow Your Skills",
                    "Hire Top Professionals",
                    "Build Your Dream Career",
                  ][idx]}
                </h2>
                <p className="mt-3 bg-black/40 px-4 py-2 rounded-md max-w-2xl text-center">
                  {[
                    "Post your task and get it done quickly!",
                    "Remote freelancing at your fingertips",
                    "Join our community and earn more",
                    "Connect with verified experts in minutes",
                    "Turn your passion into income today",
                  ][idx]}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Categories */}
      <section className="mb-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Top Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => handleCategoryClick(cat)}
              className="flex flex-col items-center gap-3 p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-2xl transform hover:-translate-y-1 transition duration-200"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                {cat.split(" ")[0].slice(0, 1)}
              </div>
              <h3 className="font-semibold text-lg">{cat}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Explore top tasks in {cat}
              </p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
