import React from 'react'
import PropTypes from 'prop-types'
import './EditTaskForm.scss'

function EditTaskForm({ id, name, onEditTask }) {
  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      onEditTask(id, e.target.value)
    }
  }

  return <input type="text" className="edit" defaultValue={name} onKeyDown={onKeyDown} />
}

EditTaskForm.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onEditTask: PropTypes.func.isRequired,
}

export default EditTaskForm
