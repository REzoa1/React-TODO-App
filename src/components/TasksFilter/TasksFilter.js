import React from "react";
import "./TasksFilter.css";

const TasksFilter = ({ onTabSelected }) => {
  const handleSelect = (e) => {
    if (e.target.tagName === "BUTTON") {
      let currEl = e.currentTarget.querySelector(".selected");
      currEl.classList.remove("selected");

      const btn = e.target.closest("button");
      btn.className = "selected";
      onTabSelected(e.target.textContent);
    }
  };

  return (
    <ul className="filters" onClick={handleSelect}>
      <li>
        <button className="selected">All</button>
      </li>
      <li>
        <button>Active</button>
      </li>
      <li>
        <button>Completed</button>
      </li>
    </ul>
  );
};

export default TasksFilter;
