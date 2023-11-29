import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import './Task.css'

class Task extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formattedTime: formatDistanceToNow(props.created),
    }
  }

  componentDidMount() {
    const { created } = this.props
    this.interval = setInterval(() => {
      const formattedTime = formatDistanceToNow(created)

      this.setState({ formattedTime })
    }, 60 * 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  completeTask = () => {
    const { onToggleComplete, id } = this.props
    onToggleComplete(id)
  }

  editTask = () => {
    const { onEditTask, id } = this.props
    onEditTask(id)
  }

  deleteTask = () => {
    const { onDeleteTask, id } = this.props
    onDeleteTask(id)
  }

  render() {
    const { id, name, isCompleted } = this.props
    const { formattedTime } = this.state

    return (
      <div className="view">
        <input type="checkbox" className="toggle" id={id} onChange={this.completeTask} checked={isCompleted} />
        <label htmlFor={id}>
          <span className="description">{name}</span>
          <span className="created">created {formattedTime} ago</span>
        </label>
        <button aria-label="Edit" type="button" className="icon icon-edit" onClick={this.editTask} />
        <button aria-label="Delete" type="button" className="icon icon-destroy" onClick={this.deleteTask} />
      </div>
    )
  }
}

Task.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool,
  onToggleComplete: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
}

Task.defaultProps = {
  isCompleted: false,
}

export default Task
