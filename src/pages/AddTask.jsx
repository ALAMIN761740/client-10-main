import React, { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AddTask() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const categories = [
    "Web Development",
    "Graphic Design",
    "Digital Marketing",
    "Content Writing",
    "App Development",
    "UI/UX Design",
    "SEO Optimization",
    "Video Editing",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("Please login first!");

    const form = e.target;
    const newTask = {
      title: form.title.value.trim(),
      name: user?.displayName,
      email: user?.email,
      description: form.description.value.trim(),
      budget: form.budget.value,
      date: new Date(form.deadline.value).toISOString(),
      category: form.category.value,
    };

    if (!newTask.title || !newTask.description)
      return toast.error("All fields are required");

    try {
      setLoading(true);

      const res = await fetch("http://localhost:4000/api/taskroute/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("🎉 Task added successfully!");
        navigate("/browse-tasks");
      } else toast.error(data.message || "Failed to add task");
    } catch (error) {
      toast.error("❌ Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10">
      <div className="max-w-xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl transform hover:scale-[1.01] transition duration-300">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 drop-shadow">
          Add New Task
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="font-semibold text-gray-700 dark:text-gray-300">
              Task Title
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="Enter task title"
              className="input input-bordered w-full mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>

          {/* Category */}
          <div>
            <label className="font-semibold text-gray-700 dark:text-gray-300">
              Category
            </label>
            <select
              name="category"
              required
              className="select select-bordered w-full mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            >
              <option value="" disabled selected>
                Choose a category
              </option>
              {categories.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="font-semibold text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              name="description"
              required
              placeholder="Write task details here..."
              className="textarea textarea-bordered w-full mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              rows={4}
            ></textarea>
          </div>

          {/* Deadline & Budget */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-gray-700 dark:text-gray-300">
                Deadline
              </label>
              <input
                type="date"
                name="deadline"
                required
                className="input input-bordered w-full mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>
            <div>
              <label className="font-semibold text-gray-700 dark:text-gray-300">
                Budget ($)
              </label>
              <input
                type="number"
                name="budget"
                required
                placeholder="Ex: 100"
                className="input input-bordered w-full mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>
          </div>

          {/* User Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="input input-bordered bg-gray-100 dark:bg-gray-700"
            />
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input input-bordered bg-gray-100 dark:bg-gray-700"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full text-lg flex justify-center items-center gap-2"
          >
            {loading && <span className="loading loading-spinner"></span>}
            {loading ? "Adding..." : "Add Task"}
          </button>
        </form>
      </div>
    </div>
  );
}
