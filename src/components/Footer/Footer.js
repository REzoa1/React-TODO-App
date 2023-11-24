import React from "react";
import "./Footer.css";
import TasksFilter from "../TasksFilter/TasksFilter";

const Footer = ({ activeCount }) => {
  return (
    <footer className="footer">
      <span className="todo-count">
        {activeCount > 0 ? `${activeCount} items left` : "Done!"}
      </span>
      <TasksFilter />
      <button className="clear-completed">Clear completed</button>
    </footer>
  );
};

export default Footer;
