import React from "react";
import "./ScoreBoard.scss";

class ScoreBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      highScore: "4:00",
      scoreArray: ["1:14", "2:07", "1:56", "4:00"]
    };
  }
  componentDidUpdate() {}
  render() {
    const { highScore, scoreArray } = this.state;
    const indexOfHighScore = scoreArray.indexOf(highScore);
    const scoreList = scoreArray.map((scoreItem, index) => {
      return (
        <li key={index}>
          Game {index + 1} : {scoreItem}
        </li>
      );
    });
    scoreList.splice(indexOfHighScore, 1);
    return (
      <div className="scoreBoard-section">
        <h3>SCORE BOARD</h3>
        <ul>{scoreList}</ul>
        <p>PERSONAL BEST</p>
        <ul>
          <li key={scoreList.length}>
            Game {indexOfHighScore + 1} : {highScore}
          </li>
        </ul>
      </div>
    );
  }
}

export default ScoreBoard;
