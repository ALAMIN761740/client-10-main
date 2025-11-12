import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const MyTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

  // ✅ ইউজারের নিজের টাস্ক লোড করা
  useEffect(() => {
    const fetchTasks = async () => {
      if (!user?.email) return; // যদি ইউজার লোড না হয়
      try {
        const res = await fetch("http://localhost:4000/api/taskroute/mytaskdata", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: user.email }),
        });

        const data = await res.json();
        if (data.success) {
          setTasks(data.data);
        } else {
          toast.error("Failed to fetch tasks");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
        toast.error("An error occurred while fetching tasks");
      }
    };

    fetchTasks();
  }, [user?.email]);

  // ✅ টাস্ক ডিলিট ফাংশন
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        const res = await fetch(`http://localhost:4000/api/taskroute/tasks/${id}`, {
          method: "DELETE",
        });

        const data = await res.json();

        if (data.success) {
          toast.success("Task Deleted!");
          setTasks((prev) => prev.filter((t) => t._id !== id));
        } else {
          toast.error("Failed to delete task");
        }
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("An error occurred while deleting the task");
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">My Posted Tasks</h2>

      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks found!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-base-200">
                <th>Title</th>
                <th>Budget</th>
                <th>Deadline</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id}>
                  <td>{task.title}</td>
                  <td>${task.budget}</td>
                  <td>{new Date(task.deadline || task.date).toLocaleDateString()}</td>
                  <td className="space-x-2">
                    <Link
                      to={`/update-task/${task._id}`}
                      className="btn btn-xs btn-info text-white"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="btn btn-xs btn-error text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyTasks;
