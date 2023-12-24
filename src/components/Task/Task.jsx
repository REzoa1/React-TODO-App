import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import { cn } from '../../utils/helpers'
import Timer from '../Timer/Timer'

function Task({
  id,
  name,
  created,
  seconds,
  intervalId,
  isCompleted,
  onToggleComplete,
  onEditTask,
  onDeleteTask,
  onSecondsSet,
}) {
  const initialTime = formatDistanceToNow(created)
  const hasTimer = seconds !== undefined ? intervalId === null : true

  const [time, setTime] = useState(initialTime)
  const [isPaused, setIsPaused] = useState(hasTimer)

  useEffect(() => {
    const interval = setInterval(() => {
      const formattedTime = formatDistanceToNow(created)
      setTime(formattedTime)
    }, 60 * 1000)

    return () => clearInterval(interval)
  }, [created])

  const onPlay = () => {
    if (!isCompleted && isPaused) {
      setIsPaused(false)
    }
  }

  const onPause = () => {
    if (!isPaused) {
      setIsPaused(true)
    }
  }

  const completeTask = () => {
    onToggleComplete(id)
    setIsPaused(true)
  }

  const editTask = () => {
    if (!isCompleted) {
      onEditTask(id)
    }
  }

  const deleteTask = () => {
    onDeleteTask(id)
  }

  const className = cn('icon', isCompleted && 'disable')

  return (
    <div className="view">
      <input type="checkbox" className="toggle" id={id} onChange={completeTask} checked={isCompleted} />
      <label htmlFor={id}>
        <span className="title">{name}</span>
        <span className="description">
          <button aria-label="Play" type="button" className={`${className} icon-play`} onClick={onPlay} />
          <button aria-label="Pause" type="button" className={`${className} icon-pause`} onClick={onPause} />

          <Timer
            id={id}
            initialSeconds={seconds}
            intervalId={intervalId}
            isPaused={isPaused}
            isCompleted={isCompleted}
            onSecondsSet={onSecondsSet}
            onDeleteTask={onDeleteTask}
          />
        </span>
        <span className="description">created {time} ago</span>
      </label>
      <button aria-label="Edit" type="button" className={`${className} icon-edit`} onClick={editTask} />
      <button aria-label="Delete" type="button" className="icon icon-destroy" onClick={deleteTask} />
    </div>
  )
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
