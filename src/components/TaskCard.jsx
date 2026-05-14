import { useState } from "react";

function TaskCard({
  task,
  deleteTask,
  moveTask,
  currentColumn,
  editTask,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const saveEdit = () => {
    editTask(task.id, editedText);
    setIsEditing(false);
  };

  return (
    <div className={`task-card ${task.priority.toLowerCase()}`}>
      <div className="task-name">
        {isEditing ? (
          <>
            <input
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
            />
            <button onClick={saveEdit}>Save</button>
          </>
        ) : (
          <h4 onClick={() => setIsEditing(true)}>
            {task.text}
          </h4>
        )}
      </div>

      <div className="task-footer">
        <div className="priority">
          <span className="priority-label">Priority:</span>
          <span className={`priority-value ${task.priority.toLowerCase()}`}>
            {task.priority}
          </span>
        </div>

        <div className="buttons">
          {currentColumn !== "todo" && (
            <button
              className="button-move"
              onClick={() => moveTask(task.id, currentColumn, "left")}
            >
              ←
            </button>
          )}

          {currentColumn !== "done" && (
            <button
              className="button-move"
              onClick={() => moveTask(task.id, currentColumn, "right")}
            >
              →
            </button>
          )}

          <button
            className="button-delete"
            onClick={() => deleteTask(task.id, currentColumn)}
          >
            Delete
          </button>
          <button
            className="button-edit"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;