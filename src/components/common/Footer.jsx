import React from "react";
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl font-bold">FreelanceTask</h2>
          <p className="text-sm">© 2025 All Rights Reserved</p>
        </div>

        <div className="flex gap-4">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <Link to="/add-task" className="hover:text-white transition">Add Task</Link>
          <Link to="/browse-tasks" className="hover:text-white transition">Browse Tasks</Link>
          <Link to="/my-tasks" className="hover:text-white transition">My Tasks</Link>
        </div>

        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition">Facebook</a>
          <a href="#" className="hover:text-white transition">Twitter</a>
          <a href="#" className="hover:text-white transition">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
