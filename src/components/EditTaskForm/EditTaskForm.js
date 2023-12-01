import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './EditTaskForm.scss'

class EditTaskForm extends Component {
  onKeyDown = (e) => {
    const { onEditTask, id } = this.props
    if (e.key === 'Enter') {
      onEditTask(id, e.target.value)
    }
  }

  render() {
    const { name } = this.props

    return <input type="text" className="edit" defaultValue={name} onKeyDown={this.onKeyDown} />
  }
}

EditTaskForm.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onEditTask: PropTypes.func.isRequired,
}

export default EditTaskForm
