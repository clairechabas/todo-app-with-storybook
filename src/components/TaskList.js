import React from "react";
import Task from "./Task";

const TaskList = ({ loading, tasks, onPinTask, onArchiveTask }) => {
  const events = {
    onPinTask,
    onArchiveTask
  };

  // Loading state
  if (loading) {
    return <div className="list-items">Loading</div>;
  }

  // Empty state
  if (tasks.length === 0) {
    return <div className="list-items">Empty</div>;
  }

  // Display tasks : default and pinned states
  return (
    <div className="list-items">
      {tasks.map(task => (
        <Task key={task.id} task={task} {...events} />
      ))}
    </div>
  );
};

export default TaskList;
