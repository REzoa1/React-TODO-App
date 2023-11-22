import React from "react";
import Task from "../Task/Task";
import NewTaskForm from "../NewTaskForm/NewTaskForm";
import "./TaskList.css";

const TaskList = ({ todos }) => {
  const elements = todos.map(({ name, completed, isEdit, id, created }) => {
    const className = isEdit ? "editing" : completed ? "completed" : null;

    return (
      <li key={id} className={className}>
        <Task name={name} completed={completed} />
        {isEdit && <NewTaskForm name={name} />}
      </li>
    );
  });
  return <ul className="todo-list">{elements}</ul>;
};

export default TaskList;
