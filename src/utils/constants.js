import PropTypes from 'prop-types'

const TASKS_INITIAL = [
  {
    id: 1,
    name: 'Completed task',
    isCompleted: true,
    isEdited: false,
    created: new Date(),
  },
  {
    id: 2,
    name: 'Editing task',
    isCompleted: false,
    isEdited: false,
    created: new Date(),
  },
  {
    id: 3,
    name: 'Active task',
    isCompleted: false,
    isEdited: false,
    created: new Date(),
  },
]

const taskTypes = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  isCompleted: PropTypes.bool,
  isEdited: PropTypes.bool,
  created: PropTypes.instanceOf(Date),
})

const FILTER_LIST = ['All', 'Active', 'Completed']

export { TASKS_INITIAL, taskTypes, FILTER_LIST }
