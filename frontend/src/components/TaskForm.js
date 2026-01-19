import React, { useState } from "react";

function TaskForm({ refreshTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:8000/api/tasks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
      }),
    })
      .then(res => res.json())
      .then(() => {
        setTitle("");
        setDescription("");
        refreshTasks();
      });
  };

  return (
   <form onSubmit={handleSubmit} className="mb-4">
  <input
    className="form-control form-control-lg mb-3"
    placeholder="What do you want to do?"
    value={title}
    onChange={e => setTitle(e.target.value)}
    required
  />

  <textarea
    className="form-control mb-3"
    placeholder="Add some details..."
    value={description}
    onChange={e => setDescription(e.target.value)}
    rows="3"
  />

  <button className="btn btn-success w-100 py-2 fw-semibold">
    Add Task
  </button>
</form>

  );
}

export default TaskForm;
