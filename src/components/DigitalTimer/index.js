import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    minutes: 25,
    add: 25,
    seconds: 0,
    isStarted: false,
    timerState: true,
    disable: false,
  }

  startTimer = () => {
    const {minutes, seconds, add} = this.state

    this.timerId = setInterval(() => {
      this.setState(prevState => {
        const change = prevState.seconds === 0
        if (prevState.minutes === 1) {
          clearInterval(this.timerId)

          return {
            minutes: 0,
            seconds: 0,
            isStarted: false,
            timerState: true,
            disable: true,
          }
        }
        if (prevState.minutes === 0) {
          return {
            minutes: add,
            seconds: 0,
            isStarted: true,
            timerState: false,
            disable: true,
          }
        }
        return {
          minutes: change ? prevState.minutes - 1 : prevState.minutes,
          seconds: change ? 59 : prevState.seconds - 1,
          isStarted: true,
          timerState: false,
          disable: true,
        }
      })
    }, 1000)
  }

  pause = () => {
    clearInterval(this.timerId)
    this.setState({isStarted: false, timerState: true, disable: true})
  }

  resetTime = () => {
    clearInterval(this.timerId)
    this.setState(prevState => ({
      minutes: 25,
      seconds: 0,
      isStarted: false,
      timerState: true,
      add: 25,
      disable: false,
    }))
  }

  addLimit = () => {
    const {isStarted, disable} = this.state
    if (disable === false) {
      this.setState(prevState => ({
        minutes: prevState.minutes + 1,
        add: prevState.add + 1,
      }))
    }
  }

  subLimit = () => {
    const {isStarted, disable} = this.state
    if (disable === false) {
      this.setState(prevState => ({
        minutes: prevState.minutes - 1,
        add: prevState.add - 1,
      }))
    }
  }

  render() {
    const {minutes, seconds, isStarted, timerState, add} = this.state

    const displayMinutes = minutes > 9 ? `${minutes}` : `0${minutes}`
    const displaySeconds = seconds > 9 ? `${seconds}` : `0${seconds}`
    const URL = isStarted
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const altText = isStarted ? 'pause icon' : 'play icon'
    const buttonText = isStarted ? 'Pause' : 'Start'
    const eventListener = isStarted ? this.pause : this.startTimer
    const status = timerState ? 'Paused' : 'Running'
    return (
      <div>
        <h1>Digital Timer</h1>
        <div className="bg">
          <h1>
            {displayMinutes}:{displaySeconds}
          </h1>
          <p> {status} </p>
        </div>
        <div>
          <div>
            <button type="button" onClick={eventListener}>
              <img src={URL} alt={altText} />
              <p>{buttonText}</p>
            </button>
            <div>
              <button type="button" onClick={this.resetTime}>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="Reset icon"
                />
                <p>Reset</p>
              </button>
            </div>
          </div>
          <div>
            <p>Set Timer limit</p>
            <div>
              <button type="button" onClick={this.addLimit}>
                +
              </button>
              <p>{add}</p>
              <button type="button" onClick={this.subLimit}>
                -
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
