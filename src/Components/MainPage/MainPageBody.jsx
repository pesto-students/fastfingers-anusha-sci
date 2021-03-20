import React from "react";
import ScoreBoard from "./ScoreBoard";
import WordSection from "./WordSection";
// import Timer from "./Timer";
import CircularTimer from "./CircularTimer";
import "./MainPageBody.scss";
// import { render } from "react-dom";
import dictionaryObject from "./dictionary";

class MainPageBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roundTime: 10,
      difficultyFactor: 1,
      currentWord: "",
      correctWordCount: 0,
      selectedDictionary: dictionaryObject[this.props.difficultyLevel]
    };
    // this.initialSetUp();
    // console.log(this.props.difficultyLevel)

    // console.log("dict obj" , dictionaryObject[this.props.difficultyLevel])
    // console.log("selected dict" , this.state.selectedDictionary)
    // console.log(this.state.difficultyFactor)
  }

  setNewTimer = () => {
    console.log("i got called");
    let {
      correctWordCount,
      currentWord,
      roundTime,
      difficultyFactor,
      selectedDictionary
    } = this.state;
    difficultyFactor += 0.01;
    correctWordCount += 1;
    if (difficultyFactor < 1.5) {
      selectedDictionary = dictionaryObject["EASY"];
    } else if (difficultyFactor < 2) {
      selectedDictionary = dictionaryObject["MEDIUM"];
    } else selectedDictionary = dictionaryObject["HARD"];
    currentWord =
      selectedDictionary[Math.floor(Math.random() * selectedDictionary.length)];
    roundTime = Math.ceil(currentWord.length / difficultyFactor);
    roundTime = roundTime < 2 ? 2 : roundTime;
    console.log("New timer call back set state");
    this.setState(
      {
        correctWordCount: correctWordCount,
        currentWord: currentWord,
        roundTime: roundTime,
        difficultyFactor: difficultyFactor,
        selectedDictionary: selectedDictionary
      },
      () => console.log(this.state.currentWord, this.state.roundTime)
    );
  };

  componentDidMount() {
    let { selectedDictionary, difficultyFactor } = this.state;
    selectedDictionary = dictionaryObject[this.props.difficultyLevel];
    // console.log(selectedDictionary)
    const currentWord =
      selectedDictionary[Math.floor(Math.random() * selectedDictionary.length)];
    let roundTime = Math.ceil(currentWord.length / difficultyFactor);
    roundTime = roundTime < 2 ? 2 : roundTime;
    console.log("Component did mount Main page set state");
    this.setState({
      roundTime: roundTime,
      selectedDictionary: selectedDictionary,
      currentWord: currentWord
    });
  }

  render() {
    const { currentWord, roundTime } = this.state;
    if (!currentWord) {
      console.log("Current word not set yet in Main page");
      return null;
    }
    console.log("Main page render called with word:", currentWord);
    return (
      <div className="mainPageBody-section">
        <ScoreBoard className="score-section" />
        <div className="timerWord-section">
          <CircularTimer roundTime={roundTime} callBack={this.timeEnd} />
          <WordSection currentWord={currentWord} callBack={this.setNewTimer} />
        </div>
      </div>
    );
  }
}

export default MainPageBody;
