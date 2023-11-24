import React, { Component } from "react";
import TaskList from "../TaskList/TaskList";
import Footer from "../Footer/Footer";
import "./App.css";

class App extends Component {
  count = 0;

  constructor() {
    super();
    this.state = {
      tasksData: [
        this.createTask("Completed task"),
        this.createTask("Editing task"),
        this.createTask("Active task"),
      ],
    };
  }

  createTask = (name) => {
    return {
      name,
      isCompleted: false,
      isEdited: false,
      id: this.count++,
      created: new Date(),
    };
  };

  onToggleComplete = (id) => {
    this.setState(({ tasksData }) => {
      const idx = tasksData.findIndex((el) => el.id === id);

      const newTasks = [
        ...tasksData.slice(0, idx),
        { ...tasksData[idx], isCompleted: !tasksData[idx].isCompleted },
        ...tasksData.slice(idx + 1),
      ];

      return { tasksData: newTasks };
    });
  };

  onDeleteTask = (id) => {
    this.setState(({ tasksData }) => ({
      tasksData: tasksData.filter((el) => el.id !== id),
    }));
  };

  render() {
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
          <TaskList
            todos={this.state.tasksData}
            onToggleComplete={this.onToggleComplete}
            onDeleteTask={this.onDeleteTask}
          />
          <Footer />
        </section>
      </section>
    );
  }
}

export default App;
