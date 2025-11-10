import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/*   Slider */}
      <section className="mb-12">
        <Swiper spaceBetween={20} slidesPerView={1} loop={true} autoplay={{ delay: 3000 }}>
          <SwiperSlide>
            <div className="h-[400px] flex flex-col justify-center items-center bg-blue-500 text-white rounded-lg">
              <h2 className="text-3xl font-bold">Find the Right Freelancer</h2>
              <p className="mt-2">Post your task and get it done quickly!</p>
              <button className="btn btn-primary mt-4">Get Started</button>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-[400px] flex flex-col justify-center items-center bg-green-500 text-white rounded-lg">
              <h2 className="text-3xl font-bold">Work Anytime, Anywhere</h2>
              <p className="mt-2">Remote freelancing at your fingertips</p>
              <button className="btn btn-secondary mt-4">Browse Tasks</button>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-[400px] flex flex-col justify-center items-center bg-purple-500 text-white rounded-lg">
              <h2 className="text-3xl font-bold">Grow Your Skills</h2>
              <p className="mt-2">Join our community and earn more</p>
              <button className="btn btn-accent mt-4">Join Now</button>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Featured Tasks Section */}
      <section className="mb-12 px-6">
        <h2 className="text-2xl font-bold text-center mb-6">Featured Tasks</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {tasks.slice(0, 6).map((task) => (
            <div
              key={task._id}
              className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-lg">{task.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{task.description}</p>
              <p className="text-sm text-red-500 mt-2">Deadline: {task.deadline}</p>
              <button className="btn btn-sm btn-outline mt-3">View Details</button>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ Extra Section 1: Why Choose Us */}
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

      {/* ✅ Extra Section 2: Top Categories */}
      <section className="mb-12 px-6">
        <h2 className="text-2xl font-bold text-center mb-6">Top Categories</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow text-center">
            <h3 className="font-semibold">Web Development</h3>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow text-center">
            <h3 className="font-semibold">Graphic Design</h3>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow text-center">
            <h3 className="font-semibold">Digital Marketing</h3>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow text-center">
            <h3 className="font-semibold">Content Writing</h3>
          </div>
        </div>
      </section>
    </div>
  );
}
