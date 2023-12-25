import React, { useEffect, useState } from 'react'

import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'
import { TASKS_INITIAL } from '../../utils/constants'
import './App.scss'

function App() {
  const [tasksData, setTasksData] = useState(TASKS_INITIAL)
  const [filterName, setFilterName] = useState('All')

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
        <NewTaskForm setTasksData={setTasksData} />
      </header>
      <section className="main">
        <TaskList tasksData={tasks} filterName={filterName} setTasksData={setTasksData} />
        <Footer tasksData={tasks} filterName={filterName} setFilterName={setFilterName} setTasksData={setTasksData} />
      </section>
    </section>
  )
}

export default App
