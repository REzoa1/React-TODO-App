import React, { useState } from "react";
import "./Task.css";

const Task = ({ name, isCompleted, completeTask, deleteTask }) => {
  const [isChecked, setIsChecked] = useState(isCompleted);
  const handleCheck = (e) => {
    completeTask();
    setIsChecked(e.target.checked);
  };

  return (
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        onChange={handleCheck}
        checked={isChecked}
      />
      <label>
        <span className="description">{name}</span>
        {/* <span className="created">created 17 seconds ago</span> */}
      </label>
      <button className="icon icon-edit" />
      <button className="icon icon-destroy" onClick={deleteTask} />
    </div>
  );
};

export default Task;
