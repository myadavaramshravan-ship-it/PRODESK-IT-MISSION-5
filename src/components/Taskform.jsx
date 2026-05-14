import { useState } from "react";

function TaskForm({ addTask }) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("Low");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    addTask(text, priority);
    setText("");
    setPriority("Low");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        placeholder="Task description..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;