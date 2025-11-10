import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

import slide1 from "../assets/pexels-tranmautritam-326503.jpg";
import slide2 from "../assets/download.jpeg";
import slide3 from "../assets/gd.jpeg";
import slide4 from "../assets/ph.jpeg";
import slide5 from "../assets/wariting.jpeg";

export default function Home() {
  const [ setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
     <section className="mb-12">
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000 }}
        modules={[Autoplay]}
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div
            className="h-[400px] flex flex-col justify-center items-center text-white rounded-lg bg-cover bg-center"
            style={{ backgroundImage: `url(${slide1})` }}
          >
            <h2 className="text-3xl font-bold bg-black/50 px-4 py-2 rounded-lg">
              Find the Right Freelancer
            </h2>
            <p className="mt-2 bg-black/40 px-3 py-1 rounded-md">
              Post your task and get it done quickly!
            </p>
            <button className="btn btn-primary mt-4">Get Started</button>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div
            className="h-[400px] flex flex-col justify-center items-center text-white rounded-lg bg-cover bg-center"
            style={{ backgroundImage: `url(${slide2})` }}
          >
            <h2 className="text-3xl font-bold bg-black/50 px-4 py-2 rounded-lg">
              Work Anytime, Anywhere
            </h2>
            <p className="mt-2 bg-black/40 px-3 py-1 rounded-md">
              Remote freelancing at your fingertips
            </p>
            <button className="btn btn-secondary mt-4">Browse Tasks</button>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div
            className="h-[400px] flex flex-col justify-center items-center text-white rounded-lg bg-cover bg-center"
            style={{ backgroundImage: `url(${slide3})` }}
          >
            <h2 className="text-3xl font-bold bg-black/50 px-4 py-2 rounded-lg">
              Grow Your Skills
            </h2>
            <p className="mt-2 bg-black/40 px-3 py-1 rounded-md">
              Join our community and earn more
            </p>
            <button className="btn btn-accent mt-4">Join Now</button>
          </div>
        </SwiperSlide>
        {/* Slide 4 */}
        <SwiperSlide>
          <div
            className="h-[400px] flex flex-col justify-center items-center text-white rounded-lg bg-cover bg-center"
            style={{ backgroundImage: `url(${slide4})` }}
          >
            <h2 className="text-3xl font-bold bg-black/50 px-4 py-2 rounded-lg">
              Hire Top Professionals
            </h2>
            <p className="mt-2 bg-black/40 px-3 py-1 rounded-md">
              Connect with verified experts in minutes
            </p>
            <button className="btn btn-info mt-4">Hire Now</button>
          </div>
        </SwiperSlide>

        {/* Slide 5 */}
        <SwiperSlide>
          <div
            className="h-[400px] flex flex-col justify-center items-center text-white rounded-lg bg-cover bg-center"
            style={{ backgroundImage: `url(${slide5})` }}
          >
            <h2 className="text-3xl font-bold bg-black/50 px-4 py-2 rounded-lg">
              Build Your Dream Career
            </h2>
            <p className="mt-2 bg-black/40 px-3 py-1 rounded-md">
              Turn your passion into income today
            </p>
            <button className="btn btn-success mt-4">Start Now</button>
          </div>
        </SwiperSlide>
      </Swiper>
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
