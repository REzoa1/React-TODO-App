import React from 'react'
import './TasksFilter.css'

function TasksFilter({ onTabSelected }) {
  const handleSelect = (e) => {
    const currEl = document.querySelector('.selected')
    currEl.classList.remove('selected')

    e.currentTarget.classList.add('selected')
    onTabSelected(e.currentTarget.textContent)
  }

  return (
    <ul className="filters">
      <li>
        <button type="button" className="selected" onClick={handleSelect}>
          All
        </button>
      </li>
      <li>
        <button type="button" onClick={handleSelect}>
          Active
        </button>
      </li>
      <li>
        <button type="button" onClick={handleSelect}>
          Completed
        </button>
      </li>
    </ul>
  )
}

export default TasksFilter
