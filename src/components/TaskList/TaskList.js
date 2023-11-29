import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task/Task'
import EditTaskForm from '../EditTaskForm/EditTaskForm'
import { taskTypes } from '../../utils/constants'
import { cn } from '../../utils/helpers'

import { ReactComponent as NoDataLogo } from './noDataLogo.svg'
import './TaskList.css'

function TaskList({ tasksData, filterName, onToggleComplete, onDeleteTask, onEditTask }) {
  const callback = ({ isCompleted }) => (filterName === 'Completed' ? isCompleted : !isCompleted)
  const tasks = filterName === 'All' ? tasksData : tasksData.filter(callback)

  const NoDataDiv = (
    <div className="no-data">
      <NoDataLogo />
      No data
    </div>
  )

  const elements = tasks.map(({ name, isCompleted, isEdited, id, created }) => {
    const className = cn(isEdited && 'editing', isCompleted && 'completed')
    return (
      <li key={id} className={className}>
        <Task
          id={id}
          name={name}
          created={created}
          isCompleted={isCompleted}
          onToggleComplete={onToggleComplete}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
        />

        {isEdited && <EditTaskForm id={id} name={name} onEditTask={onEditTask} />}
      </li>
    )
  })

  return <ul className="todo-list">{tasks.length ? elements : NoDataDiv}</ul>
}

TaskList.propTypes = {
  tasksData: PropTypes.arrayOf(taskTypes).isRequired,
  filterName: PropTypes.string,
  onToggleComplete: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
}

TaskList.defaultProps = {
  filterName: 'All',
}

export default TaskList
