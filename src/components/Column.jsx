import TaskCard from "./TaskCard";

function Column({
  title,
  tasks,
  deleteTask,
  moveTask,
  currentColumn,
  editTask,
}) {
  return (
    <div className={`row ${currentColumn}`}>
      <h2>{title}</h2>

      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          moveTask={moveTask}
          currentColumn={currentColumn}
          editTask={editTask}
        />
      ))}
    </div>
  );
}

export default Column;