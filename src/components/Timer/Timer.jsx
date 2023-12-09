import { intervalToDuration } from 'date-fns'
import PropTypes from 'prop-types'
import { Component } from 'react'

class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = { seconds: props.seconds }
  }

  componentDidUpdate(prevProps) {
    const { isPaused } = this.props

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
    const { onSecondsSet, id } = this.props
    const { seconds } = this.state
    onSecondsSet(id, seconds)
    clearInterval(this.interval)
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
  isPaused: PropTypes.bool.isRequired,
}

export default Timer
