import React from "react";
import "./Header.scss";
import { FaUser } from "react-icons/fa";
import { FaGamepad } from "react-icons/fa";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player_name: "PLAYER NAME",
      difficulty_level: "MEDIUM",
      score: 0
    };
  }

  render() {
    const { player_name, difficulty_level, score } = this.state;
    return (
      <div className="header-section">
        <div>
          <p>
            <FaUser />
            {player_name}
          </p>
          <p>
            <FaGamepad /> LEVEL: {difficulty_level}
          </p>
        </div>
        <div>
          <p className="game-title">fast fingers</p>
          <p>SCORE: {score}</p>
        </div>
      </div>
    );
  }
}

export default Header;
