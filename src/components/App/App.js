import React, { Component } from "react";
import TaskList from "../TaskList/TaskList";
import Footer from "../Footer/Footer";
import "./App.css";

class App extends Component {
  count = 0;

  constructor() {
    super();
    this.state = {
      tasksData: this.tasksInitial,
      filteredData: null,
      filterName: "All",
      value: "",
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

  tasksInitial = [
    this.createTask("Completed task"),
    this.createTask("Editing task"),
    this.createTask("Active task"),
  ];

  onToggleComplete = (id) => {
    const { filterName, filteredData } = this.state;

    this.setState(({ tasksData }) => {
      const idx = tasksData.findIndex((task) => task.id === id);

      const newTasks = [
        ...tasksData.slice(0, idx),
        { ...tasksData[idx], isCompleted: !tasksData[idx].isCompleted },
        ...tasksData.slice(idx + 1),
      ];
      const newFilteredData = newTasks.filter(({ isCompleted }) =>
        filterName === "Active" ? isCompleted === false : isCompleted === true
      );

      if (filteredData) {
        return { tasksData: newTasks, filteredData: newFilteredData };
      } else {
        return { tasksData: newTasks };
      }
    });
  };

  onDeleteTask = (id) => {
    if (this.state.filteredData) {
      this.setState(({ filteredData }) => ({
        filteredData: filteredData.filter((task) => task.id !== id),
      }));
    }

    this.setState(({ tasksData }) => ({
      tasksData: tasksData.filter((task) => task.id !== id),
    }));
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { filterName } = this.state;

    const newTask = this.createTask(this.state.value);
    if (filterName === "Active") {
      this.setState(({ tasksData }) => ({
        filteredData: [newTask, ...tasksData],
      }));
    }

    this.setState(({ tasksData }) => ({
      tasksData: [newTask, ...tasksData],
      value: "",
    }));
  };

  onChange = (e) => {
    this.setState({ value: e.target.value });
  };

  onTabSelected = (name) => {
    this.setState(({ tasksData }) => ({
      filterName: name,
      filteredData:
        name === "All"
          ? null
          : tasksData.filter(({ isCompleted }) =>
              name === "Active" ? isCompleted === false : isCompleted === true
            ),
    }));
  };

  clearCompleted = () => {
    const { filterName } = this.state;
    if (filterName === "Completed") {
      this.setState({ filteredData: [] });
    }

    this.setState(({ tasksData }) => ({
      tasksData: tasksData.filter(({ isCompleted }) => !isCompleted),
    }));
  };

  render() {
    const { tasksData, filteredData, value } = this.state;
    const activeCount = this.state.tasksData.filter(
      (task) => !task.isCompleted
    ).length;
    const tasks = filteredData ? filteredData : tasksData;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={this.onSubmit}>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              autoFocus
              value={value}
              onChange={this.onChange}
            />
          </form>
        </header>
        <section className="main">
          {filteredData?.data?.length === 0 ? (
            <>No data</>
          ) : (
            <TaskList
              tasks={tasks}
              onToggleComplete={this.onToggleComplete}
              onDeleteTask={this.onDeleteTask}
            />
          )}
          <Footer
            activeCount={activeCount}
            onTabSelected={this.onTabSelected}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    );
  }
}

export default App;
