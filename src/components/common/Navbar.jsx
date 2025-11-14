import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";

export default function Navbar() {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const activeClass =
    "text-white font-bold bg-gradient-to-r from-purple-500 to-indigo-500 px-3 py-1 rounded-lg shadow";

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-white hover:text-yellow-300 transition"
        >
          Freelancer
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex flex-1 justify-center space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? activeClass : "text-white hover:text-yellow-200 transition"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/add-task"
            className={({ isActive }) =>
              isActive ? activeClass : "text-white hover:text-yellow-200 transition"
            }
          >
            Add Task
          </NavLink>
          <NavLink
            to="/browse-tasks"
            className={({ isActive }) =>
              isActive ? activeClass : "text-white hover:text-yellow-200 transition"
            }
          >
            Browse Tasks
          </NavLink>
          <NavLink
            to="/my-tasks"
            className={({ isActive }) =>
              isActive ? activeClass : "text-white hover:text-yellow-200 transition"
            }
          >
            My Tasks
          </NavLink>
        </div>

        {/* Profile / Auth */}
        <div className="flex items-center gap-2">
          {user ? (
            <div className="hidden lg:block relative group">
              <img
                src={user.photoURL || "https://i.ibb.co/2d3Yj6d/user.png"}
                alt="user"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
              />
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  My Profile
                </Link>
                <button
                  onClick={logOut}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="hidden lg:flex gap-2">
              <Link
                to="/login"
                className="px-3 py-1 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-3 py-1 bg-white text-purple-700 rounded-lg hover:bg-gray-100 transition"
              >
                Signup
              </Link>
            </div>
          )}

          {/* Mobile Menu */}
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
              className="text-white focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Links */}
      {menuOpen && (
        <div className="lg:hidden bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 px-4 pb-4 space-y-2">
          <NavLink to="/" className="block text-white hover:text-yellow-200 transition">
            Home
          </NavLink>
          <NavLink to="/add-task" className="block text-white hover:text-yellow-200 transition">
            Add Task
          </NavLink>
          <NavLink to="/browse-tasks" className="block text-white hover:text-yellow-200 transition">
            Browse Tasks
          </NavLink>
          <NavLink to="/my-tasks" className="block text-white hover:text-yellow-200 transition">
            My Tasks
          </NavLink>

          {!user && (
            <div className="flex gap-2 mt-2">
              <Link
                to="/login"
                className="px-3 py-1 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-3 py-1 bg-white text-purple-700 rounded-lg hover:bg-gray-100 transition"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
