import React from "react";
import Task from "../Task/Task";
import NewTaskForm from "../NewTaskForm/NewTaskForm";
import "./TaskList.css";
// import { formatDistanceToNow } from "date-fns";

const TaskList = ({ todos, onToggleComplete, onDeleteTask }) => {
  const elements = todos.map(({ name, isCompleted, isEdited, id, created }) => {
    const className = isEdited ? "editing" : isCompleted ? "completed" : null;
    return (
      <li key={id} className={className}>
        <Task
          name={name}
          isCompleted={isCompleted}
          completeTask={() => onToggleComplete(id)}
          deleteTask={() => onDeleteTask(id)}
        />
        {isEdited && <NewTaskForm name={name} />}
      </li>
    );
  });
  return <ul className="todo-list">{elements}</ul>;
};

export default TaskList;
