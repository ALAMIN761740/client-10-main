import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:4000/api/taskroute/gettask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        if (!res.ok) throw new Error(`Server Error: ${res.status}`);
        const data = await res.json();
        if (!data.data) throw new Error("Task not found");
        setTask(data.data);
      } catch (err) {
        setError(err.message || "Failed to load task");
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  if (loading)
    return <p className="text-center mt-10 animate-pulse text-purple-600">Loading task details...</p>;

  if (error)
    return <p className="text-center mt-10 text-red-600 font-semibold">{error}</p>;

  if (!task)
    return <p className="text-center mt-10 text-gray-600">No task found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 mt-12">

      <div className="relative bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 
                      border border-purple-400/30 backdrop-blur-md
                      hover:shadow-purple-500/40 transition-all duration-300 hover:scale-[1.01]">

        {/* Decorative Gradient Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-t-xl" />

        {/* Title */}
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
          {task.title}
        </h2>

        {/* Details */}
        <div className="space-y-4 text-lg">
          <p><span className="font-semibold text-purple-600 dark:text-purple-300">Category:</span> {task.category || "N/A"}</p>

          <p><span className="font-semibold text-purple-600 dark:text-purple-300">Description:</span> {task.description || "N/A"}</p>

          <p><span className="font-semibold text-purple-600 dark:text-purple-300">Deadline:</span> 
            {task.deadline ? new Date(task.deadline).toLocaleDateString() : "N/A"}
          </p>

          <p><span className="font-semibold text-purple-600 dark:text-purple-300">Budget:</span> 
            ${task.budget || "N/A"}
          </p>

          <p><span className="font-semibold text-purple-600 dark:text-purple-300">Posted By:</span> 
            {task.name || "N/A"} ({task.email || "N/A"})
          </p>
        </div>

        {/* Back Button */}
        <Link
          to="/browse-tasks"
          className="inline-block mt-8 px-6 py-3 rounded-xl font-semibold text-white
                     bg-gradient-to-r from-purple-600 to-indigo-600 
                     hover:from-purple-700 hover:to-indigo-700
                     shadow-lg hover:shadow-purple-500/40 
                     transition-all duration-300"
        >
        Back to Tasks
        </Link>
      </div>
    </div>
  );
};

export default TaskDetails;
