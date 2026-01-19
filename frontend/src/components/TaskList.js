import React, { useEffect, useState } from "react";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // 🔹 READ
  const fetchTasks = () => {
    fetch("http://127.0.0.1:8000/api/tasks/")
      .then(res => res.json())
      .then(data => setTasks(data));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 🔹 DELETE
  const deleteTask = (id) => {
    if (window.confirm("Delete this task?")) {
      fetch(`http://127.0.0.1:8000/api/tasks/${id}/`, {
        method: "DELETE",
      }).then(() => fetchTasks());
    }
  };

  // 🔹 OPEN EDIT MODAL
  const editTask = (task) => {
    setEditId(task.id);
    setTitle(task.title);
    setDescription(task.description);
  };

  // 🔹 UPDATE
  const updateTask = () => {
    fetch(`http://127.0.0.1:8000/api/tasks/${editId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    })
      .then(res => res.json())
      .then(() => {
        setEditId(null);
        setTitle("");
        setDescription("");
        fetchTasks();
      });
  };

  return (
    <div>
      <h4 className="text-center mb-4">Your Tasks</h4>

      {/* TASK LIST */}
      {tasks.length === 0 ? (
        <p className="text-center text-muted">No tasks yet</p>
      ) : (
        tasks.map(task => (
          <div key={task.id} className="card mb-3 shadow-sm p-3">
            <h5 className="fw-semibold mb-1">{task.title}</h5>
            <p className="text-muted small mb-3">{task.description}</p>

            <div className="d-flex gap-2">
              <button
                className="btn btn-sm btn-outline-warning"
                onClick={() => editTask(task)}
              >
                Edit
              </button>

              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}

      {/* EDIT MODAL */}
      {editId && (
        <div
          className="modal fade show d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-4">
              <h5 className="fw-bold mb-3">Edit Task</h5>

              <input
                className="form-control mb-3"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Title"
              />

              <textarea
                className="form-control mb-3"
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows="3"
                placeholder="Description"
              />

              <div className="d-flex justify-content-end gap-2">
                <button
                  className="btn btn-light"
                  onClick={() => setEditId(null)}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-primary"
                  onClick={updateTask}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskList;
