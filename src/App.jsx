import { useEffect, useState } from "react";
import "./App.css";

import TaskForm from "./components/Taskform";
import Column from "./components/Column";
import TaskCard from "./components/TaskCard";

function App() {
  const [board, setBoard] = useState(() => {
    const saved = localStorage.getItem("kanbanBoard");

    return saved
      ? JSON.parse(saved)
      : {
          todo: [],
          progress: [],
          done: [],
        };
  });

  useEffect(() => {
    localStorage.setItem("kanbanBoard", JSON.stringify(board));
  }, [board]);

  const addTask = (text, priority) => {
    const newTask = {
      id: Date.now(),
      text,
      priority,
    };
    
    setBoard({
      ...board,
      todo: [...board.todo, newTask],
    });
  };

  const deleteTask = (id, column) => {
    setBoard({
      ...board,
      [column]: board[column].filter((task) => task.id !== id),
    });
  };

  const moveTask = (id, column, direction) => {
    const task = board[column].find((t) => t.id === id);
    const targetColumn = direction === "right"
      ? (column === "todo" ? "progress" : column === "progress" ? "done" : null)
      : (column === "progress" ? "todo" : column === "done" ? "progress" : null);

    if (!targetColumn) return;

    setBoard((prev) => ({
      ...prev,
      [column]: prev[column].filter((t) => t.id !== id),
      [targetColumn]: [...prev[targetColumn], task],
    }));
  };

  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const editTask = (id, updatedText) => {
    const updateColumn = (tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, text: updatedText } : task
      );

    setBoard({
      todo: updateColumn(board.todo),
      progress: updateColumn(board.progress),
      done: updateColumn(board.done),
    });
  };

  const filterTasks = (tasks) => {
    return tasks.filter((task) => {
      const matchesText = task.text.toLowerCase().includes(search.toLowerCase());
      const matchesPriority = priorityFilter === "All" || task.priority === priorityFilter;
      return matchesText && matchesPriority;
    });
  };

  return (
    <div className="app">
      <h1>Kanban Task Board</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="form-filter-wrapper">
        <TaskForm addTask={addTask} />
        
        <div className="filter-container">
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="filter-dropdown"
          >
            <option value="All">Filter: All</option>
            <option value="Low">Filter: Low</option>
            <option value="Medium">Filter: Medium</option>
            <option value="High">Filter: High</option>
          </select>
        </div>
      </div>

      <div className="board">
        <Column
          title="To Do"
          tasks={filterTasks(board.todo)}
          deleteTask={deleteTask}
          moveTask={moveTask}
          currentColumn="todo"
          editTask={editTask}
        />

        <Column
          title="In Progress"
          tasks={filterTasks(board.progress)}
          deleteTask={deleteTask}
          moveTask={moveTask}
          currentColumn="progress"
          editTask={editTask}
        />

        <Column
          title="Done"
          tasks={filterTasks(board.done)}
          deleteTask={deleteTask}
          moveTask={moveTask}
          currentColumn="done"
          editTask={editTask}
        />
      </div>
    </div>
  );
}

export default App;