import React, { useEffect, useState, useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function BrowseTasks() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const { category } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:4000/api/taskroute/alltask");
        if (!res.ok) throw new Error(`Server: ${res.status}`);
        const json = await res.json();
        if (mounted) setTasks(json.data || []);
      } catch (err) {
        if (mounted) setError(err.message || "Failed to fetch");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchTasks();
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    if (!category || category === "all") setFilteredTasks(tasks);
    else {
      const filtered = tasks.filter(
        (t) => (t.category || "").toLowerCase() === category.toLowerCase()
      );
      setFilteredTasks(filtered);
    }
  }, [tasks, category]);

  const handleFilterChange = (e) => {
    const selected = e.target.value;
    if (selected === "all") navigate("/browse-tasks");
    else navigate(`/browse-tasks/${encodeURIComponent(selected)}`);
  };

  const quickNav = (cat) => {
    navigate(`/browse-tasks/${encodeURIComponent(cat)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
            {category ? `${category} Tasks` : "Browse All Tasks"}
          </h2>

          <div className="flex items-center gap-3">
            <select
              className="select select-primary w-56"
              value={category || "all"}
              onChange={handleFilterChange}
            >
              <option value="all">All Categories</option>
              {categories.map((cat, i) => (
                <option key={i} value={cat}>{cat}</option>
              ))}
            </select>
            <Link to="/" className="btn btn-ghost">Back Home</Link>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          {categories.slice(0, 6).map((c) => (
            <button
              key={c}
              onClick={() => quickNav(c)}
              className={`px-4 py-2 rounded-full border transition ${
                c === category ? "bg-purple-600 text-white" : "bg-white dark:bg-gray-800"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="p-6 bg-white/60 dark:bg-gray-800/60 rounded-xl animate-pulse h-40" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : !filteredTasks.length ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
              {category ? `${category} Tasks Not Found` : "No Tasks Available"}
            </h3>
            <div className="flex justify-center gap-4 mt-6">
              <Link to="/" className="btn btn-primary">Back Home</Link>
              <Link to="/browse-tasks" className="btn btn-outline">All Categories</Link>
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTasks.map((task) => (
              <article
                key={task._id}
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 border-b-4 border-transparent hover:border-purple-500"
              >
                <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-300 mb-2">
                  {task.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{task.category}</p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{(task.description || "").slice(0, 110)}...</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-300">${task.budget}</div>
                  <div className="text-xs text-gray-500">📅 {new Date(task.date).toLocaleDateString()}</div>
                </div>
                {/* Details Button */}
                <button
                  onClick={() => navigate(`/task-details/${task._id}`)}
                  className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                >
                  View Details
                </button>

              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
