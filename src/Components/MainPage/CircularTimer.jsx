import React from "react";
import "./CircularTimer.scss";

export default class CircularTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSeconds: 10,
      seconds: 10,
      strokedashoffset: 440
    };
  }

  componentDidMount() {
    const totalSeconds = this.state.totalSeconds;
    var seconds = this.state.seconds;
    seconds = 0;
    this.interval = setInterval(() => {
      if (seconds === totalSeconds) {
        clearInterval(this.interval);
      }
      this.setState({
        strokedashoffset: 440 - seconds * (440 / totalSeconds),
        seconds: totalSeconds - seconds
      });
      seconds = seconds + 1;
    }, 1000);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  render() {
    return (
      <div className="item">
        <h2>{this.state.seconds}</h2>

        <svg id="circle-svg" width="160" height="160">
          <circle
            id="circle-anime"
            r="69.85699"
            cy="81"
            cx="81"
            strokeWidth="8"
            stroke="grey"
            fill="none"
          ></circle>
          <circle
            id="circle-anime-bg"
            r="69.85699"
            cy="81"
            cx="81"
            strokeWidth="8"
            stroke="#ff5155"
            fill="none"
            strokeDashoffset={this.state.strokedashoffset.toFixed()}
            strokeDasharray="440"
          ></circle>
        </svg>
      </div>
    );
  }
}
