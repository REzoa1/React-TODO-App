import { TASKS_INITIAL } from './constants'

let count = TASKS_INITIAL.length

const createTask = (name) => {
  count += 1

  return {
    id: count,
    name,
    isCompleted: false,
    isEdited: false,
    created: new Date(),
  }
}

const updateData = (currEl, props, actionType) => {
  const newProps = props.reduce((acc, currProp) => {
    if (Array.isArray(currProp)) {
      const [key, value] = currProp
      switch (actionType) {
        case 'edit': {
          acc[key] = value || currEl[key]
          break
        }
        default: {
          acc[key] = value
        }
      }
    } else {
      acc[currProp] = !currEl[currProp]
    }
    return acc
  }, {})

  return { ...currEl, ...newProps }
}

const cn = (...classes) => [...classes].filter(Boolean).join(' ')

const updateTask = (setTasks, id, props, actionType) => {
  setTasks((tasks) => tasks.map((task) => (task.id === id ? updateData(task, props, actionType) : task)))
}

export { createTask, cn, updateTask }
