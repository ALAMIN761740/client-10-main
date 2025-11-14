import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const MyTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!user?.email) return;
      try {
        const res = await fetch("http://localhost:4000/api/taskroute/mytaskdata", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email }),
        });

        const data = await res.json();
        if (data.success) setTasks(data.data);
        else toast.error("Failed to fetch tasks");
      } catch (error) {
        console.error("Error fetching tasks:", error);
        toast.error("An error occurred while fetching tasks");
      }
    };

    fetchTasks();
  }, [user?.email]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/api/taskroute/tasks/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("Task Deleted!");
        setTasks((prev) => prev.filter((t) => t._id !== id));
      } else toast.error("Failed to delete task");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("An error occurred while deleting the task");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-purple-700">
        My Posted Tasks
      </h2>

      {tasks.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">No tasks found!</p>
      ) : (
        <div className="max-w-6xl mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 border-l-4 border-purple-500"
            >
              <h3 className="text-xl font-bold text-purple-700 dark:text-purple-300 mb-2">{task.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">{task.category}</p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{task.description?.slice(0, 100)}...</p>
              <p className="text-sm text-indigo-600 dark:text-indigo-300 font-semibold mb-4">
                💰 ${task.budget} | 📅 {new Date(task.deadline || task.date).toLocaleDateString()}
              </p>

              <div className="flex gap-2">
                {/* Update */}
                <Link
                  to={`/update-task/${task._id}`}
                  className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg text-center hover:bg-yellow-600 transition"
                >
                  Update
                </Link>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(task._id)}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTasks;
