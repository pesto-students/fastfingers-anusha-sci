import React, { Component } from "react";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeAllowed: 10
    };
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(this.tick, 1000);
  }

  tick() {
    if (this.state.timeAllowed > 0) {
      this.setState({ timeAllowed: this.state.timeAllowed - 1 });
    } else {
      this.setState({ timeAllowed: 10 });
    }
  }

  // componentWillUnmount() {
  //   clearInterval(this.timer);
  // }

  render() {
    return (
      <div>
        <h1>00:{this.state.timeAllowed}</h1>
      </div>
    );
  }
}

export default Timer;
