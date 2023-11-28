import React, { Component } from 'react'

import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'
import { createTask, updData } from '../../utils/helpers'
import { TASKS_INITIAL } from '../../utils/constants'

import { ReactComponent as NoDataLogo } from './noDataLogo.svg'
import './App.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      tasksData: TASKS_INITIAL,
      filteredData: null,
      filterName: 'All',
    }
  }

  addTask = (newData) => {
    const { filteredData, filterName } = this.state
    const states = ['tasksData', filteredData && filterName === 'Active' && 'filteredData'].filter(Boolean)

    this.setState((state) => {
      const newStates = states.reduce((acc, stateName) => {
        acc[stateName] = [newData, ...state[stateName]]
        return acc
      }, {})

      return newStates
    })
  }

  onAddTask = (name) => {
    const taskName = name.trim()
    if (!taskName) {
      return
    }

    const newTask = createTask(taskName)
    this.addTask(newTask)
  }

  removeTask = (id) => {
    const { filteredData } = this.state
    const states = ['tasksData', filteredData && 'filteredData'].filter(Boolean)

    this.setState((state) => {
      const newStates = states.reduce((acc, stateName) => {
        acc[stateName] = state[stateName].filter((task) => task.id !== id)
        return acc
      }, {})

      return newStates
    })
  }

  onDeleteTask = (id) => {
    this.removeTask(id)
  }

  updateTask = (id, props) => {
    const { filteredData } = this.state
    const states = ['tasksData', filteredData && 'filteredData'].filter(Boolean)

    this.setState((state) => {
      const newStates = states.reduce((acc, stateName) => {
        const data = state[stateName]
        const idx = data.findIndex((task) => task.id === id)

        const newTask = updData(data, idx, props)
        const newData = [...data.slice(0, idx), newTask, ...data.slice(idx + 1)]

        acc[stateName] = newData
        return acc
      }, {})

      return newStates
    })
  }

  onToggleComplete = (id) => {
    this.updateTask(id, ['isCompleted'])

    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.filteredData) {
      this.setState(({ filteredData, filterName }) => ({
        filteredData: filteredData.filter(({ isCompleted }) =>
          filterName === 'Completed' ? isCompleted : !isCompleted
        ),
      }))
    }
  }

  onEditTask = (id, newName) => {
    this.updateTask(id, [['name', newName], 'isEdited'])
  }

  onTabSelected = (name) => {
    const { filterName } = this.state
    if (name === filterName) {
      return
    }

    this.setState(({ tasksData }) => ({
      filterName: name,
      filteredData:
        name === 'All'
          ? null
          : tasksData.filter(({ isCompleted }) => (name === 'Completed' ? isCompleted : !isCompleted)),
    }))
  }

  clearCompleted = () => {
    const { filterName } = this.state
    if (filterName === 'Completed') {
      this.setState({ filteredData: [] })
    }

    this.setState(({ tasksData }) => ({
      tasksData: tasksData.filter(({ isCompleted }) => !isCompleted),
    }))
  }

  render() {
    const { tasksData, filteredData } = this.state
    const tasks = filteredData || tasksData

    const isDataEmpty = filteredData?.length === 0 || tasksData?.length === 0
    const main = isDataEmpty ? (
      <div className="no-data">
        <NoDataLogo />
        No data
      </div>
    ) : (
      <TaskList
        tasks={tasks}
        onToggleComplete={this.onToggleComplete}
        onDeleteTask={this.onDeleteTask}
        onEditTask={this.onEditTask}
      />
    )

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onAddTask={this.onAddTask} />
        </header>
        <section className="main">
          {main}
          <Footer tasksData={tasksData} onTabSelected={this.onTabSelected} clearCompleted={this.clearCompleted} />
        </section>
      </section>
    )
  }
}

export default App
