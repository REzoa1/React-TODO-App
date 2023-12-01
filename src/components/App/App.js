import React, { Component } from 'react'

import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'
import { createTask, updateData } from '../../utils/helpers'
import { TASKS_INITIAL } from '../../utils/constants'
import './App.scss'

class App extends Component {
  constructor() {
    super()
    this.state = {
      tasksData: TASKS_INITIAL,
      filterName: 'All',
    }
  }

  get activeTaskCount() {
    const { tasksData } = this.state
    return tasksData?.filter(({ isCompleted }) => !isCompleted).length
  }

  onAddTask = (name) => {
    const taskName = name.trim()
    if (!taskName) {
      return
    }

    const newTask = createTask(taskName)
    this.setState(({ tasksData }) => ({
      tasksData: [newTask, ...tasksData],
    }))
  }

  onDeleteTask = (id) => {
    this.setState(({ tasksData }) => ({
      tasksData: tasksData.filter((task) => task.id !== id),
    }))
  }

  updateTask = (id, props) => {
    this.setState(({ tasksData }) => {
      const idx = tasksData.findIndex((task) => task.id === id)

      const newTask = updateData(tasksData[idx], props)
      const newData = [...tasksData.slice(0, idx), newTask, ...tasksData.slice(idx + 1)]

      return { tasksData: newData }
    })
  }

  onToggleComplete = (id) => {
    this.updateTask(id, ['isCompleted'])
  }

  onEditTask = (id, newName) => {
    this.updateTask(id, [['name', newName], 'isEdited'])
  }

  onTabSelected = (name) => {
    const { filterName } = this.state
    if (name === filterName) {
      return
    }

    this.setState({ filterName: name })
  }

  clearCompleted = () => {
    this.setState(({ tasksData }) => ({
      tasksData: tasksData.filter(({ isCompleted }) => !isCompleted),
    }))
  }

  render() {
    const { tasksData, filterName } = this.state

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onAddTask={this.onAddTask} />
        </header>
        <section className="main">
          <TaskList
            tasksData={tasksData}
            filterName={filterName}
            onToggleComplete={this.onToggleComplete}
            onDeleteTask={this.onDeleteTask}
            onEditTask={this.onEditTask}
          />
          <Footer
            activeTaskCount={this.activeTaskCount}
            onTabSelected={this.onTabSelected}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    )
  }
}

export default App
