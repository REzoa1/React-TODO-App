import { useEffect, useState, useRef } from 'react'
import { intervalToDuration } from 'date-fns'
import PropTypes from 'prop-types'

function Timer({ id, initialSeconds, intervalId, isPaused, isCompleted, onSecondsSet }) {
  const [seconds, setSeconds] = useState(initialSeconds)
  const currIntervalId = useRef()

  const shouldTimerUpdate = !isPaused && !isCompleted
  const shouldTimerClear = isPaused || isCompleted

  useEffect(() => {
    const interval =
      shouldTimerUpdate &&
      setInterval(() => {
        setSeconds((prev) => prev + 1)
      }, 1000)

    currIntervalId.current = interval || null

    if (intervalId) {
      clearInterval(intervalId)
    }

    if (shouldTimerClear) {
      clearInterval(interval)
    }

    return () => {
      clearInterval(intervalId)
      clearInterval(interval)
      currIntervalId.current = null
    }
  }, [intervalId, shouldTimerUpdate, shouldTimerClear])

  useEffect(() => {
    return () => {
      let s = seconds

      if (shouldTimerClear) {
        onSecondsSet(id, s)
      }

      if (shouldTimerUpdate && currIntervalId.current === null) {
        const newInterval = setInterval(() => {
          s += 1
          onSecondsSet(id, s, newInterval)
        }, 1000)
        onSecondsSet(id, s, newInterval)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, seconds, shouldTimerUpdate, shouldTimerClear, currIntervalId])

  const zeros = (num) => (num < 10 ? `0${num}` : num)

  const duration = intervalToDuration({ start: 0, end: seconds * 1000 })
  const formatted = `${zeros(duration.minutes)}:${zeros(duration.seconds)}`

  return formatted
}

Timer.propTypes = {
  id: PropTypes.number.isRequired,
  initialSeconds: PropTypes.number.isRequired,
  intervalId: PropTypes.number,
  isPaused: PropTypes.bool.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  onSecondsSet: PropTypes.func.isRequired,
}

Timer.defaultProps = {
  intervalId: null,
}

export default Timer
