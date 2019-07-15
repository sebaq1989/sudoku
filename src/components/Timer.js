import React, { Component } from 'react'

class Timer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            minutes: 0,
            seconds: 0
        }
    }

    componentDidMount() {
        const { startCount } = this.props
        this.setState({
            seconds: startCount
        })
        this.doIntervalChange()
    }

    doIntervalChange = () => {
        this.myInterval = setInterval(() => {
            this.setState(prevState => ({
                seconds: (prevState.seconds + 1) % 60,
                minutes: this.state.minutes + Math.floor((prevState.seconds + 1) / 60) * 1
            }))
            let mins = ('0' + (this.state.minutes)).slice(-2);
            let secs = ('0' + (this.state.seconds)).slice(-2);
            this.props.timerCount(`${mins}:${secs}`)
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    render() {
        if (!this.props.timerOn) clearInterval(this.myInterval);
        let { minutes, seconds } = this.state;
        seconds = ("0" + seconds).slice(-2);
        minutes = ("0" + minutes).slice(-2);
        return (
            <div>
                <h1>{minutes}:{seconds}</h1>
            </div>
        )
    }


}

export default Timer;