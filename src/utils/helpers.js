import { TASKS_INITIAL } from './constants'

const updateData = (dataName, newData) => {
  this.setState((prev) => {
    return {
      [dataName]: [newData, ...prev[dataName]],
    }
  })
}

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

const updData = (data, idx, props) => {
  const newProps = props.reduce((acc, currProp) => {
    if (Array.isArray(currProp)) {
      const [key, value] = currProp
      acc[key] = value || data[idx][key]
    } else {
      acc[currProp] = !data[idx][currProp]
    }
    return acc
  }, {})

  return { ...data[idx], ...newProps }
}

const cn = (...classes) => [...classes].filter(Boolean).join(' ')

export { updateData, cn, createTask, updData }
