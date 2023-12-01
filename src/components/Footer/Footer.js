import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../TasksFilter/TasksFilter'
import './Footer.scss'

class Footer extends PureComponent {
  render() {
    const { activeTaskCount, onTabSelected, clearCompleted } = this.props

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
}

Footer.propTypes = {
  activeTaskCount: PropTypes.number.isRequired,
  onTabSelected: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
}

export default Footer
