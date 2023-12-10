import { intervalToDuration } from 'date-fns'
import PropTypes from 'prop-types'
import { Component } from 'react'

class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = { seconds: props.seconds }
  }

  componentDidMount() {
    const { isPaused, isCompleted } = this.props

    if (isPaused || isCompleted) {
      clearInterval(this.interval)
    } else {
      this.interval = setInterval(() => {
        this.setState((state) => ({
          seconds: state.seconds + 1,
        }))
      }, 1000)
    }
  }

  componentDidUpdate(prevProps) {
    const { isPaused, intervalId } = this.props

    if (intervalId) {
      clearInterval(intervalId)
    }

    if (isPaused) {
      clearInterval(this.interval)
      return
    }

    if (prevProps.isPaused !== isPaused) {
      this.interval = setInterval(() => {
        this.setState((state) => ({
          seconds: state.seconds + 1,
        }))
      }, 1000)
    }
  }

  componentWillUnmount() {
    const { id, isPaused, onSecondsSet, intervalId } = this.props
    const { seconds } = this.state
    clearInterval(intervalId)
    clearInterval(this.interval)

    if (!isPaused) {
      let s = seconds
      this.interval = setInterval(() => {
        s += 1
        onSecondsSet(id, s, this.interval)
      }, 1000)
      onSecondsSet(id, s, this.interval)
    } else {
      onSecondsSet(id, seconds)
    }
  }

  render() {
    const { seconds } = this.state
    const zeros = (num) => (num < 10 ? `0${num}` : num)

    const duration = intervalToDuration({ start: 0, end: seconds * 1000 })
    const formatted = `${zeros(duration.minutes)}:${zeros(duration.seconds)}`

    return formatted
  }
}

Timer.propTypes = {
  id: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
  intervalId: PropTypes.number,
  isCompleted: PropTypes.bool.isRequired,
  isPaused: PropTypes.bool.isRequired,
  onSecondsSet: PropTypes.func.isRequired,
}

Timer.defaultProps = {
  intervalId: null,
}

export default Timer
