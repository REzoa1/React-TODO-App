import React from "react";
import "./Footer.css";
import TasksFilter from "../TasksFilter/TasksFilter";

const Footer = ({ activeCount, onTabSelected, clearCompleted }) => {


  return (
    <footer className="footer">
      <span className="todo-count">
        {activeCount > 0 ? `${activeCount} items left` : "Done!"}
      </span>
      <TasksFilter onTabSelected={onTabSelected}/>
      <button className="clear-completed" onClick={clearCompleted}>Clear completed</button>
    </footer>
  );
};

export default Footer;
