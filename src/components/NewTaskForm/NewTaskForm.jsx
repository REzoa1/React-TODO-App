import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { createTask } from '../../utils/helpers'
import './NewTaskForm.scss'

function NewTaskForm({ setTasksData }) {
  const [value, setValue] = useState('')

  const onAddTask = (name) => {
    const taskName = name.trim()
    if (!taskName) {
      return
    }
    const newTask = createTask(name)

    setTasksData((tasks) => [newTask, ...tasks])
  }

  const onSubmit = (e) => {
    e.preventDefault()

    onAddTask(value)
    setValue('')
  }

  const onChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <form onSubmit={onSubmit}>
      <input className="new-todo" placeholder="What needs to be done?" value={value} onChange={onChange} required />
    </form>
  )
}

NewTaskForm.propTypes = {
  setTasksData: PropTypes.func.isRequired,
}

export default NewTaskForm
