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

  render() {
    const { id, name, isCompleted, completeTask, editTask, deleteTask } = this.props
    const { formattedTime } = this.state

    return (
      <div className="view">
        <input type="checkbox" className="toggle" id={id} onChange={completeTask} checked={isCompleted} />
        <label htmlFor={id}>
          <span className="description">{name}</span>
          <span className="created">created {formattedTime} ago</span>
        </label>
        <button aria-label="Edit" type="button" className="icon icon-edit" onClick={editTask} />
        <button aria-label="Delete" type="button" className="icon icon-destroy" onClick={deleteTask} />
      </div>
    )
  }
}

Task.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool,
  completeTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
}

Task.defaultProps = {
  isCompleted: false,
}

export default Task
