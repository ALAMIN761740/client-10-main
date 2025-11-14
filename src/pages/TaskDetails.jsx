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

  if (loading) return <p className="text-center mt-10">Loading task details...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (!task) return <p className="text-center mt-10">No task found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 shadow rounded mt-10">
      <h2 className="text-3xl font-bold mb-4 text-purple-700 dark:text-purple-300">{task.title}</h2>
      <div className="mb-4"><b>Category:</b> {task.category || "N/A"}</div>
      <div className="mb-4"><b>Description:</b> {task.description || "N/A"}</div>
      <div className="mb-4"><b>Deadline:</b> {task.deadline ? new Date(task.deadline).toLocaleDateString() : "N/A"}</div>
      <div className="mb-4"><b>Budget:</b> ${task.budget || "N/A"}</div>
      <div className="mb-4"><b>Posted By:</b> {task.name || "N/A"} ({task.email || "N/A"})</div>
      <Link to="/browse-tasks" className="inline-block mt-6 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
        Back to Tasks
      </Link>
    </div>
  );
};

export default TaskDetails;
