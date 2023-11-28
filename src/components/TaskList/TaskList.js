import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task/Task'
import EditTaskForm from '../EditTaskForm/EditTaskForm'
import { taskTypes } from '../../utils/constants'
import { cn } from '../../utils/helpers'
import './TaskList.css'

function TaskList({ tasks, onToggleComplete, onDeleteTask, onEditTask }) {
  const elements = tasks.map(({ name, isCompleted, isEdited, id, created }) => {
    const className = cn(isEdited && 'editing', isCompleted && 'completed')

    return (
      <li key={id} className={className}>
        <Task
          id={id}
          name={name}
          created={created}
          isCompleted={isCompleted}
          completeTask={() => onToggleComplete(id)}
          editTask={() => onEditTask(id)}
          deleteTask={() => onDeleteTask(id)}
        />

        {isEdited && <EditTaskForm id={id} name={name} onEditTask={onEditTask} />}
      </li>
    )
  })

  return <ul className="todo-list">{elements}</ul>
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(taskTypes).isRequired,
  onToggleComplete: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
}

export default TaskList
