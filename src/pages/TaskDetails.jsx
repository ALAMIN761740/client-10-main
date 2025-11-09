import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TaskDetails = ({}) => {
  // console.log(data);
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/api/taskroute/gettask`,{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => setTask(data.data));
  }, [id]);
  console.log("task detail",task)
  if (!task) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 shadow rounded">
      <h2 className="text-3xl font-bold mb-4">{task.title}</h2>
      <p><b>Category:</b> {task.category}</p>
      <p><b>Description:</b> {task.description}</p>
      <p><b>Deadline:</b> {new Date(task.deadline).toLocaleDateString()}</p>
      <p><b>Budget:</b> ${task.budget}</p>
      <p><b>Posted By:</b> {task.name} ({task.email})</p>
    </div>
  );
};

export default TaskDetails;
