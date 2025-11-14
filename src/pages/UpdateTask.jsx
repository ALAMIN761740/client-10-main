import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  // Load Task
  useEffect(() => {
    fetch(`http://localhost:4000/api/taskroute/tasks/${id}`)
      .then((res) => res.json())
      .then((data) => setTask(data))
      .catch((err) => {
        console.error("Failed to fetch task:", err);
        toast.error("Failed to load task");
      });
  }, [id]);

  // Update Task
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedTask = {
      title: form.title.value,
      category: form.category.value,
      description: form.description.value,
      deadline: form.deadline.value,
      budget: form.budget.value,
    };

    try {
      const res = await fetch(`http://localhost:4000/api/taskroute/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Task updated successfully!");
        navigate("/my-tasks");
      } else toast.error(data.message || "Update failed!");
    } catch (error) {
      toast.error("Server error!");
    }
  };

  if (!task) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Update Task</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          defaultValue={task.title}
          className="input input-bordered w-full"
          required
        />

        <select
          name="category"
          defaultValue={task.category}
          className="select select-bordered w-full"
          required
        >
          <option value="Web Development">Web Development</option>
          <option value="Graphic Design">Graphic Design</option>
          <option value="Digital Marketing">Digital Marketing</option>
          <option value="Content Writing">Content Writing</option>
          <option value="App Development">App Development</option>
          <option value="UI/UX Design">UI/UX Design</option>
          <option value="SEO Optimization">SEO Optimization</option>
          <option value="Video Editing">Video Editing</option>
        </select>

        <textarea
          name="description"
          defaultValue={task.description}
          className="textarea textarea-bordered w-full"
          required
        ></textarea>

        <input
          type="date"
          name="deadline"
          defaultValue={task.deadline?.slice(0, 10)}
          className="input input-bordered w-full"
          required
        />

        <input
          type="number"
          name="budget"
          defaultValue={task.budget}
          className="input input-bordered w-full"
          required
        />

        <button className="btn btn-primary w-full">Update Task</button>
      </form>
    </div>
  );
};

export default UpdateTask;
