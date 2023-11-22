import React, { useState } from "react";
import "./Task.css";

const Task = ({ name, completed }) => {
  const [isChecked, setIsChecked] = useState(completed);
  const handleCheck = (e) => {
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
      <button className="icon icon-destroy" />
    </div>
  );
};

export default Task;
