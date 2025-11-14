import React, { useMemo, useState, useEffect } from "react";
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
  const [featuredTasks, setFeaturedTasks] = useState([]);

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

  // Fetch Featured Tasks
  useEffect(() => {
    fetch("http://localhost:4000/api/taskroute/alltask")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // Take top 6 tasks for featured
          const tasks = data.data.slice(0, 6).map((t, idx) => ({
            ...t,
            isNew: idx < 2, // first 2 tasks as New
            isHot: idx >= 2 && idx < 4, // next 2 as Hot
          }));
          setFeaturedTasks(tasks);
        }
      })
      .catch((err) => console.error(err));
  }, []);

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

      {/* Top Categories */}
      <section className="mb-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Top Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => handleCategoryClick(cat)}
              className="flex flex-col items-center gap-3 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-200 border-t-4 border-purple-500"
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

      {/* Featured Tasks */}
      <section className="mb-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Tasks</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredTasks.map((task) => (
            <div
              key={task._id}
              className="relative p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 border-t-4 border-purple-500 transition"
            >
              {/* Badge */}
              {task.isNew && (
                <span className="absolute top-3 right-3 px-2 py-1 text-xs font-bold text-white bg-gradient-to-r from-green-400 to-green-600 rounded-full shadow-lg">
                  New
                </span>
              )}
              {task.isHot && !task.isNew && (
                <span className="absolute top-3 right-3 px-2 py-1 text-xs font-bold text-white bg-gradient-to-r from-red-400 to-red-600 rounded-full shadow-lg">
                  Hot
                </span>
              )}

              <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-300 mb-2">
                {task.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{task.category}</p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {task.description?.slice(0, 80)}...
              </p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-300">
                  ${task.budget}
                </span>
                <span className="text-xs text-gray-500">
                  📅 {new Date(task.date).toLocaleDateString()}
                </span>
              </div>
              <button
                onClick={() => navigate(`/task-details/${task._id}`)}
                className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded hover:from-purple-600 hover:to-indigo-600 transition"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="mb-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Post a Task",
              desc: "Describe your project and post it to get matched with freelancers.",
            },
            {
              title: "Hire Expert",
              desc: "Choose the best freelancer from proposals and start working.",
            },
            {
              title: "Get it Done",
              desc: "Track progress, communicate, and receive your completed work.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition border-t-4 border-indigo-500"
            >
              <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-300 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
