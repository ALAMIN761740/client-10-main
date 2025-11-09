import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const MyTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:4000/api/taskroute/get`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user.email),}
      )
        .then((res) => res.json())
        .then((data) => setTasks(data));
    }
  }, [user]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Task Deleted!");
        setTasks(tasks.filter((t) => t._id !== id));
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Posted Tasks</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
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
                <td>{new Date(task.deadline).toLocaleDateString()}</td>
                <td className="space-x-2">
                  <Link to={`/update-task/${task._id}`} className="btn btn-xs btn-info">Update</Link>
                  <button onClick={() => handleDelete(task._id)} className="btn btn-xs btn-error">Delete</button>
                  <button className="btn btn-xs btn-secondary">Bids</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTasks;
