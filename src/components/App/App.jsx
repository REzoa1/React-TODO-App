import React, { useEffect, useState } from 'react'

import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'
import { createTask, updateData } from '../../utils/helpers'
import { TASKS_INITIAL } from '../../utils/constants'
import './App.scss'

function App() {
  const [tasksData, setTasksData] = useState(TASKS_INITIAL)
  const [filterName, setFilterName] = useState('All')

  const onAddTask = (name) => {
    const taskName = name.trim()
    if (!taskName) {
      return
    }
    const newTask = createTask(name)

    setTasksData((tasks) => [newTask, ...tasks])
  }

  const updateTask = (id, props, actionType) => {
    setTasksData((tasks) => tasks.map((task) => (task.id === id ? updateData(task, props, actionType) : task)))
  }

  const onDeleteTask = (id) => {
    setTasksData((tasks) =>
      tasks.map((task) => {
        return task.id === id ? { id, shouldTimerClear: true } : task
      })
    )
  }

  const onToggleComplete = (id) => {
    updateTask(id, ['isCompleted'])
  }

  const onEditTask = (id, newName) => {
    updateTask(id, [['name', newName], 'isEdited'], 'edit')
  }

  const onSecondsSet = (id, seconds, intervalId = null) => {
    updateTask(id, [
      ['seconds', seconds],
      ['intervalId', intervalId],
    ])
  }

  const onTabSelected = (name) => {
    if (name === filterName) {
      return
    }
    setFilterName(name)
  }

  const clearCompleted = () => {
    setTasksData((tasks) => tasks.filter(({ isCompleted }) => !isCompleted))
  }

  const activeTaskCount = tasksData?.filter(({ isCompleted }) => !isCompleted).length
  const tasksWithTimer = tasksData.filter((task) => task.shouldTimerClear === true)

  useEffect(() => {
    tasksWithTimer.forEach((task) => {
      clearInterval(task.intervalId)
    })

    return () => {
      tasksWithTimer.forEach((task) => {
        setTasksData((tasks) => tasks.filter(({ id }) => task.id !== id))
      })
    }
  }, [tasksWithTimer])
  const tasks = !tasksWithTimer.length ? tasksData : []

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onAddTask={onAddTask} />
      </header>
      <section className="main">
        <TaskList
          tasksData={tasks}
          filterName={filterName}
          onToggleComplete={onToggleComplete}
          onDeleteTask={onDeleteTask}
          onEditTask={onEditTask}
          onSecondsSet={onSecondsSet}
        />
        <Footer activeTaskCount={activeTaskCount} onTabSelected={onTabSelected} clearCompleted={clearCompleted} />
      </section>
    </section>
  )
}

export default App
