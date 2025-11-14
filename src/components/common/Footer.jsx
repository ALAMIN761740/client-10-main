import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white py-8 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold">FreelanceTask</h2>
          <p className="text-sm">© 2025 All Rights Reserved</p>
        </div>

        <div className="flex gap-4 mb-4 md:mb-0">
          <Link to="/" className="hover:text-yellow-300 transition">Home</Link>
          <Link to="/add-task" className="hover:text-yellow-300 transition">Add Task</Link>
          <Link to="/browse-tasks" className="hover:text-yellow-300 transition">Browse Tasks</Link>
          <Link to="/my-tasks" className="hover:text-yellow-300 transition">My Tasks</Link>
        </div>

        <div className="flex gap-4">
          <a href="#" className="hover:text-yellow-300 transition">Facebook</a>
          <a href="#" className="hover:text-yellow-300 transition">Twitter</a>
          <a href="#" className="hover:text-yellow-300 transition">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
