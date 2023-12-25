import React from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../TasksFilter/TasksFilter'
import './Footer.scss'
import { taskTypes } from '../../utils/constants'

function Footer({ tasksData, setTasksData, filterName, setFilterName }) {
  const activeTaskCount = tasksData.filter(({ isCompleted }) => !isCompleted).length

  const onTabSelected = (name) => {
    if (name === filterName) {
      return
    }
    setFilterName(name)
  }

  const clearCompleted = () => {
    setTasksData((tasks) =>
      tasks.map((task) => {
        return task.isCompleted ? { id: task.id, intervalId: task.intervalId, shouldTimerClear: true } : task
      })
    )
  }

  return (
    <footer className="footer">
      <span className="todo-count">{activeTaskCount > 0 ? `${activeTaskCount} items left` : 'All done!'}</span>
      <TasksFilter onTabSelected={onTabSelected} />
      <button className="clear-completed" type="button" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.propTypes = {
  tasksData: PropTypes.arrayOf(taskTypes).isRequired,
  setTasksData: PropTypes.func.isRequired,
  filterName: PropTypes.string.isRequired,
  setFilterName: PropTypes.func.isRequired,
}

export default Footer
