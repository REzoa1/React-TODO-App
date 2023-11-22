import React from "react";
import TaskList from "../TaskList/TaskList";
import Footer from "../Footer/Footer";
import "./App.css";
import { formatDistanceToNow } from "date-fns";

function App() {
  const todoData = [
    {
      name: "Completed task",
      completed: true,
      isEdit: false,
      id: 1,
      created: formatDistanceToNow(new Date()),
    },
    {
      name: "Editing task",
      completed: false,
      isEdit: true,
      id: 2,
      created: formatDistanceToNow(new Date()),
    },
    {
      name: "Active task",
      completed: false,
      isEdit: false,
      id: 3,
      created: formatDistanceToNow(new Date()),
    },
  ];

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus=""
        />
      </header>
      <section className="main">
        <TaskList todos={todoData} />
        <Footer />
      </section>
    </section>
  );
}

export default App;
