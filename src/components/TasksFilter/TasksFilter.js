import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './TasksFilter.css'
import { cn } from '../../utils/helpers'
import { FILTER_LIST } from '../../utils/constants'

class TasksFilter extends Component {
  handleSelect = (e) => {
    const { onTabSelected } = this.props
    const currEl = document.querySelector('.selected')
    currEl.classList.remove('selected')

    e.currentTarget.classList.add('selected')
    onTabSelected(e.currentTarget.textContent)
  }

  render() {
    const filters = FILTER_LIST.map((item, i) => {
      const className = cn(i === 0 && 'selected')
      return (
        <li key={`${item}-filter`}>
          <button type="button" className={className} onClick={this.handleSelect}>
            {item}
          </button>
        </li>
      )
    })

    return <ul className="filters">{filters}</ul>
  }
}

TasksFilter.propTypes = {
  onTabSelected: PropTypes.func.isRequired,
}

export default TasksFilter
