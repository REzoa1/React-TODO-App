import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './NewTaskForm.scss'

function NewTaskForm({ onAddTask }) {
  const [value, setValue] = useState('')

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
  onAddTask: PropTypes.func.isRequired,
}

export default NewTaskForm
