import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";

const BrowseTasks = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/api/taskroute/alltask")
      .then((res) => res.json())
      .then((data) => setTasks(data.data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  if(!tasks){
    return <h1>Loading</h1>
  }else{
    console.log("task")
    return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Browse Tasks</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div key={task._id} className="card bg-white dark:bg-gray-800 shadow-md p-4">
            <h3 className="font-bold text-lg">{task.title}</h3>
            <p className="text-sm text-gray-600">{task.category}</p>
            <p className="text-gray-700">{task.description.slice(0, 50)}...</p>
            <p className="text-sm">💰 {task.budget} | 📅 {new Date(task.deadline).toLocaleDateString()}</p>
            <Link data={tasks} to={`/tasks/${task._id}`} className="btn btn-sm btn-primary mt-2">See Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};
};

export default BrowseTasks;
