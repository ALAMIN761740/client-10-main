import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";

export default function Navbar() {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const activeClass = "text-blue-500 font-semibold";

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-800 dark:text-white">
          Freelancer
        </Link>

        {/* Desktop Menu (centered) */}
        <div className="hidden lg:flex flex-1 justify-center space-x-8">
          <NavLink to="/" className={({ isActive }) => (isActive ? activeClass : "text-gray-800 dark:text-white hover:text-blue-500")}>Home</NavLink>
          <NavLink to="/add-task" className={({ isActive }) => (isActive ? activeClass : "text-gray-800 dark:text-white hover:text-blue-500")}>Add Task</NavLink>
          <NavLink to="/browse-tasks" className={({ isActive }) => (isActive ? activeClass : "text-gray-800 dark:text-white hover:text-blue-500")}>Browse Tasks</NavLink>
          <NavLink to="/my-tasks" className={({ isActive }) => (isActive ? activeClass : "text-gray-800 dark:text-white hover:text-blue-500")}>My Tasks</NavLink>
        </div>

        {/* Profile / Auth */}
        <div className="flex items-center gap-2">
          {user ? (
            <div className="hidden lg:block relative group">
              <img
                src={user.photoURL || "https://i.ibb.co/2d3Yj6d/user.png"}
                alt="user"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition">
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">My Profile</Link>
                <button onClick={logOut} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Logout</button>
              </div>
            </div>
          ) : (
            <div className="hidden lg:flex gap-2">
              <Link to="/login" className="px-3 py-1 text-sm bg-blue-500 text-white rounded">Login</Link>
              <Link to="/signup" className="px-3 py-1 text-sm bg-gray-200 text-gray-800 rounded">Signup</Link>
            </div>
          )}

          {/* Mobile & Medium */}
          <div className="flex lg:hidden items-center gap-2">
            {user && (
              <img
                src={user.photoURL || "https://i.ibb.co/2d3Yj6d/user.png"}
                alt="user"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={() => navigate("/profile")}
              />
            )}
            <button
              className="text-gray-800 dark:text-white focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Medium Menu Links */}
      {menuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-900 px-4 pb-4 space-y-2">
          <NavLink to="/" className="block text-gray-800 dark:text-white hover:text-blue-500">Home</NavLink>
          <NavLink to="/add-task" className="block text-gray-800 dark:text-white hover:text-blue-500">Add Task</NavLink>
          <NavLink to="/browse-tasks" className="block text-gray-800 dark:text-white hover:text-blue-500">Browse Tasks</NavLink>
          <NavLink to="/my-tasks" className="block text-gray-800 dark:text-white hover:text-blue-500">My Tasks</NavLink>

          {!user && (
            <div className="flex gap-2 mt-2">
              <Link to="/login" className="px-3 py-1 text-sm bg-blue-500 text-white rounded">Login</Link>
              <Link to="/signup" className="px-3 py-1 text-sm bg-gray-200 text-gray-800 rounded">Signup</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
