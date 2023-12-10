import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import { cn } from '../../utils/helpers'
import Timer from '../Timer/Timer'

class Task extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formattedTime: formatDistanceToNow(props.created),
      isPaused: props.seconds ? props.intervalId === null : true,
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
    this.onPause()
  }

  editTask = () => {
    const { onEditTask, isCompleted, id } = this.props
    if (!isCompleted) {
      onEditTask(id)
    }
  }

  deleteTask = () => {
    const { onDeleteTask, id } = this.props
    onDeleteTask(id)
  }

  onPlay = () => {
    const { isCompleted } = this.props
    const { isPaused } = this.state

    if (!isCompleted && isPaused) {
      this.setState({ isPaused: false })
    }
  }

  onPause = () => {
    const { isPaused } = this.state
    if (!isPaused) {
      this.setState({ isPaused: true })
    }
  }

  render() {
    const { id, name, isCompleted, onSecondsSet, intervalId, seconds } = this.props
    const { formattedTime, isPaused } = this.state
    const className = cn('icon', isCompleted && 'disable')

    return (
      <div className="view">
        <input type="checkbox" className="toggle" id={id} onChange={this.completeTask} checked={isCompleted} />
        <label htmlFor={id}>
          <span className="title">{name}</span>
          <span className="description">
            <button aria-label="Play" type="button" className={`${className} icon-play`} onClick={this.onPlay} />
            <button aria-label="Pause" type="button" className={`${className} icon-pause`} onClick={this.onPause} />

            <Timer
              id={id}
              seconds={seconds}
              intervalId={intervalId}
              isPaused={isPaused}
              isCompleted={isCompleted}
              onSecondsSet={onSecondsSet}
            />
          </span>
          <span className="description">created {formattedTime} ago</span>
        </label>
        <button aria-label="Edit" type="button" className={`${className} icon-edit`} onClick={this.editTask} />
        <button aria-label="Delete" type="button" className="icon icon-destroy" onClick={this.deleteTask} />
      </div>
    )
  }
}

Task.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  created: PropTypes.instanceOf(Date).isRequired,
  seconds: PropTypes.number,
  intervalId: PropTypes.number,
  isCompleted: PropTypes.bool,
  onToggleComplete: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onSecondsSet: PropTypes.func.isRequired,
}

Task.defaultProps = {
  isCompleted: false,
  seconds: 0,
  intervalId: null,
}

export default Task
