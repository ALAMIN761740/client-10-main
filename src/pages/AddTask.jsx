import React from "react";
import { useAuth } from "../contexts/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const newTask = {
      title: form.title.value,
      name: user?.displayName,
      email: user?.email,
      description: form.description.value,
      budget: form.budget.value,
      date: form.deadline.value,
      category: form.category.value,
    };

    try {
      const res = await fetch("http://localhost:4000/api/taskroute/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      console.log("daatas"+res)
      const data = await res.json();
      console.log(data)
      if(res.ok) {
        console.log("hi ")
        toast.success("Task Added Successfully 🎉");
        navigate("/my-tasks");
      } else {
        toast.error(data.message || "Failed to add task");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Add a Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Task Title" required className="input input-bordered w-full" />
        <select name="category" required className="select select-bordered w-full">
          <option>Web Development</option>
          <option>Design</option>
          <option>Writing</option>
          <option>Marketing</option>
        </select>
        <textarea name="description" placeholder="Description" required className="textarea textarea-bordered w-full"></textarea>
        <input type="date" name="deadline" required className="input input-bordered w-full" />
        <input type="number" name="budget" placeholder="Budget" required className="input input-bordered w-full" />
        <input type="text" value={user?.displayName} readOnly className="input input-bordered w-full bg-gray-100" />
        <input type="email" value={user?.email} readOnly className="input input-bordered w-full bg-gray-100" />
        <button type="submit" className="btn btn-primary w-full">Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;
