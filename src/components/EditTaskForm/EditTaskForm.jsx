import React from 'react'
import PropTypes from 'prop-types'
import './EditTaskForm.scss'

function EditTaskForm({ name, onEditTask }) {
  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      onEditTask(e.target.value)
    }
  }

  return <input type="text" className="edit" defaultValue={name} onKeyDown={onKeyDown} />
}

EditTaskForm.propTypes = {
  name: PropTypes.string.isRequired,
  onEditTask: PropTypes.func.isRequired,
}

export default EditTaskForm
