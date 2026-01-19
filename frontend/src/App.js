import React, { useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

function App() {
  const [reload, setReload] = useState(false);

  const refreshTasks = () => {
    setReload(prev => !prev);
  };

  return (
    <div className="container py-5">
      {/* App shell */}
      <div
        className="app-card p-4 mx-auto"
        style={{ maxWidth: "720px" }}
      >
        <h2 className="text-center fw-bold mb-4 text-primary">
          Task Manager
        </h2>

        {/* Create */}
        <TaskForm refreshTasks={refreshTasks} />

        {/* List */}
        <TaskList key={reload} />
      </div>
    </div>
  );
}

export default App;
