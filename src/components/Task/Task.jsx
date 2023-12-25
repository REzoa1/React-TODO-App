import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import { cn, updateTask } from '../../utils/helpers'
import Timer from '../Timer/Timer'

function Task({ id, name, created, seconds, intervalId, isCompleted, onEditTask, onSecondsSet, setTasksData }) {
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
    updateTask(setTasksData, id, ['isCompleted'])
    setIsPaused(true)
  }

  const editTask = () => {
    if (!isCompleted) {
      onEditTask()
    }
  }

  const deleteTask = () => {
    setTasksData((tasks) =>
      tasks.map((task) => {
        return task.id === id ? { id, shouldTimerClear: true } : task
      })
    )
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
  onEditTask: PropTypes.func.isRequired,
  onSecondsSet: PropTypes.func.isRequired,
  setTasksData: PropTypes.func.isRequired,
}

Task.defaultProps = {
  isCompleted: false,
  seconds: 0,
  intervalId: null,
}

export default Task
