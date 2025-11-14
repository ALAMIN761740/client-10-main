import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { toast } from "react-toastify";

const UpdateTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [task, setTask] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/tasks/${id}`)
      .then((res) => res.json())
      .then((data) => setTask(data))
      .catch((err) => console.error("Failed to fetch task:", err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedTask = {
      title: form.title.value,
      category: form.category.value,
      description: form.description.value,
      deadline: form.deadline.value,
      budget: form.budget.value,
      userEmail: task.userEmail, // read-only
      userName: task.userName,   // read-only
    };

    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Task updated successfully 🎉");
        navigate("/my-tasks");
      } else {
        toast.error(data.message || "Failed to update task");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  if (!task) return <p className="text-center mt-10">Loading...</p>;

  // Security: check if logged-in user owns this task
  if (user?.email !== task.userEmail) return <p className="text-center mt-10 text-red-500">You are not authorized to update this task.</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">Update Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" defaultValue={task.title} required className="input input-bordered w-full" />
        <select name="category" defaultValue={task.category} required className="select select-bordered w-full">
          <option value="Web Development">Web Development</option>
          <option value="Graphic Design">Graphic Design</option>
          <option value="Digital Marketing">Digital Marketing</option>
          <option value="Content Writing">Content Writing</option>
          <option value="App Development">App Development</option>
          <option value="UI/UX Design">UI/UX Design</option>
          <option value="SEO Optimization">SEO Optimization</option>
          <option value="Video Editing">Video Editing</option>
        </select>
        <textarea name="description" defaultValue={task.description} required className="textarea textarea-bordered w-full"></textarea>
        <input type="date" name="deadline" defaultValue={task.deadline.slice(0,10)} required className="input input-bordered w-full" />
        <input type="number" name="budget" defaultValue={task.budget} required className="input input-bordered w-full" />
        <input type="text" value={task.userName} readOnly className="input input-bordered w-full bg-gray-100" />
        <input type="email" value={task.userEmail} readOnly className="input input-bordered w-full bg-gray-100" />
        <button type="submit" className="btn btn-primary w-full">Update Task</button>
      </form>
    </div>
  );
};

export default UpdateTask;
