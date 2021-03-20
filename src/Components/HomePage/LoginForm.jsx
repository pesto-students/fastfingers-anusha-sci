import React from "react";
import "./LoginForm.scss";
import { FaPlay } from "react-icons/fa";

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player_name: "",
      difficulty_level: "",
      isStarted: false
    };
  }
  handleNameChange = (e) => {
    // console.log(e.target.value);
    this.setState({ player_name: e.target.value });
  };
  handleDifficultyLevel = (e) => {
    // console.log(e.target.value);
    this.setState({ difficulty_level: e.target.value });
  };

  handleIsStarted = (e) => {
    this.setState({ isStarted: true });
  };
  render() {
    const { player_name, difficulty_level, isStarted } = this.state;
    return (
      <div>
        <div className="form-section">
          <form action="">
            <div>
              <input
                type="text"
                id="player-name"
                name="player-name"
                placeholder="TYPE YOUR NAME"
                value={player_name}
                onChange={this.handleNameChange}
                required
              />
            </div>
            <div>
              <select
                name="difficulty_level"
                id="difficulty_level"
                onChange={this.handleDifficultyLevel}
              >
                <option value="EASY">EASY</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="DIFFICULT">DIFFICULT</option>
              </select>
            </div>
          </form>
        </div>
        <div className="start-section">
          <FaPlay
            fontSize="1.5rem"
            onClick={this.handleIsStarted}
            cursor="pointer"
          />
          <h2 onClick={this.handleIsStarted}>START GAME</h2>
        </div>
      </div>
    );
  }
}
