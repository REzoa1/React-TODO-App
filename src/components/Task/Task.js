import React, { Component } from "react";
import { formatDistanceToNow } from "date-fns";
import "./Task.css";

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: this.props.isCompleted,
      formattedTime: formatDistanceToNow(this.props.created),
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const formattedTime = formatDistanceToNow(this.props.created);

      this.setState({ formattedTime });
    }, 60 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleCheck = (e) => {
    this.props.completeTask();
    this.setState({ isChecked: e.target.checked });
  };

  render() {
    const { name, deleteTask } = this.props;
    const { isChecked, formattedTime } = this.state;

    return (
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          onChange={this.handleCheck}
          checked={isChecked}
        />
        <label>
          <span className="description">{name}</span>
          <span className="created">created {formattedTime} ago</span>
        </label>
        <button className="icon icon-edit" />
        <button className="icon icon-destroy" onClick={deleteTask} />
      </div>
    );
  }
}
export default Task;
