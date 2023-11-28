import React from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../TasksFilter/TasksFilter'
import { taskTypes } from '../../utils/constants'
import './Footer.css'

function Footer({ tasksData, onTabSelected, clearCompleted }) {
  const activeCount = tasksData.filter((task) => !task.isCompleted).length

  return (
    <footer className="footer">
      <span className="todo-count">{activeCount > 0 ? `${activeCount} items left` : 'Done!'}</span>
      <TasksFilter onTabSelected={onTabSelected} />
      <button className="clear-completed" type="button" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.propTypes = {
  tasksData: PropTypes.arrayOf(taskTypes).isRequired,
  onTabSelected: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
}

export default Footer
