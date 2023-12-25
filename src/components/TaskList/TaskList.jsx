import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task/Task'
import EditTaskForm from '../EditTaskForm/EditTaskForm'
import { taskTypes } from '../../utils/constants'
import { cn, updateTask } from '../../utils/helpers'

import { ReactComponent as NoDataLogo } from './noDataLogo.svg'
import './TaskList.scss'

function TaskList({ tasksData, filterName, setTasksData }) {
  const callback = ({ isCompleted }) => (filterName === 'Completed' ? isCompleted : !isCompleted)
  const tasks = filterName === 'All' ? tasksData : tasksData.filter(callback)

  const NoDataDiv = (
    <div className="no-data">
      <NoDataLogo />
      No data
    </div>
  )

  const onSecondsSet = (id, seconds, intervalId = null) => {
    updateTask(setTasksData, id, [
      ['seconds', seconds],
      ['intervalId', intervalId],
    ])
  }

  const elements = tasks.map(({ name, isCompleted, isEdited, id, created, seconds, intervalId }) => {
    const className = cn(isEdited && 'editing', isCompleted && 'completed')

    const onEditTask = (newName) => {
      updateTask(setTasksData, id, [['name', newName], 'isEdited'], 'edit')
    }

    return (
      <li key={id} className={className}>
        <Task
          id={id}
          name={name}
          created={created}
          seconds={seconds}
          intervalId={intervalId}
          isCompleted={isCompleted}
          onEditTask={onEditTask}
          onSecondsSet={onSecondsSet}
          setTasksData={setTasksData}
        />

        {isEdited && <EditTaskForm name={name} onEditTask={onEditTask} />}
      </li>
    )
  })

  return <ul className="todo-list">{tasks.length ? elements : NoDataDiv}</ul>
}

TaskList.propTypes = {
  tasksData: PropTypes.arrayOf(taskTypes).isRequired,
  filterName: PropTypes.string,
  setTasksData: PropTypes.func.isRequired,
}

TaskList.defaultProps = {
  filterName: 'All',
}

export default TaskList
