import React from 'react'
import PropTypes from 'prop-types'

import { cn } from '../../utils/helpers'
import { FILTER_LIST } from '../../utils/constants'
import './TasksFilter.scss'

function TasksFilter({ onTabSelected }) {
  const handleSelect = (e) => {
    const currEl = document.querySelector('.selected')
    currEl.classList.remove('selected')

    e.currentTarget.classList.add('selected')
    onTabSelected(e.currentTarget.textContent)
  }

  const filters = FILTER_LIST.map((item, i) => {
    const className = cn(i === 0 && 'selected')
    return (
      <li key={`${item}-filter`}>
        <button type="button" className={className} onClick={handleSelect}>
          {item}
        </button>
      </li>
    )
  })

  return <ul className="filters">{filters}</ul>
}

TasksFilter.propTypes = {
  onTabSelected: PropTypes.func.isRequired,
}

export default TasksFilter
