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

const updateData = (currEl, props) => {
  const newProps = props.reduce((acc, currProp) => {
    if (Array.isArray(currProp)) {
      const [key, value] = currProp
      acc[key] = value || currEl[key]
    } else {
      acc[currProp] = !currEl[currProp]
    }
    return acc
  }, {})

  return { ...currEl, ...newProps }
}

const cn = (...classes) => [...classes].filter(Boolean).join(' ')

export { createTask, updateData, cn }
