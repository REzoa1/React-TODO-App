import React, { Component } from "react";
import Task from "../Task/Task";
import NewTaskForm from "../NewTaskForm/NewTaskForm";
import "./TaskList.css";

class TaskList extends Component {
  render() {
    const { tasks, onToggleComplete, onDeleteTask } = this.props;

    const elements = tasks.map(
      ({ name, isCompleted, isEdited, id, created }) => {
        const className = isEdited
          ? "editing"
          : isCompleted
          ? "completed"
          : null;
        return (
          <li key={id} className={className}>
            <Task
              name={name}
              created={created}
              isCompleted={isCompleted}
              completeTask={() => onToggleComplete(id)}
              deleteTask={() => onDeleteTask(id)}
            />

            {isEdited && <NewTaskForm name={name} />}
          </li>
        );
      }
    );

    return <ul className="todo-list">{elements}</ul>;
  }
}

export default TaskList;
