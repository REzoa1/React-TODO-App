import React, { Component } from 'react'
import PropTypes from 'prop-types'

class NewTaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputVal: '',
    }
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { inputVal } = this.state
    const { onAddTask } = this.props

    onAddTask(inputVal)

    this.setState({ inputVal: '' })
  }

  onChange = (e) => {
    this.setState({ inputVal: e.target.value })
  }

  render() {
    const { inputVal } = this.state

    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={inputVal}
          onChange={this.onChange}
          required
        />
      </form>
    )
  }
}

NewTaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired,
}

export default NewTaskForm
