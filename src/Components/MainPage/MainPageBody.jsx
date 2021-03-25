import React, { useState, useEffect } from "react";
import ScoreBoard from "./ScoreBoard";
import WordSection from "./WordSection";
import Header from "./Header";
import "./MainPageBody.scss";
import dictionaryObject from "./dictionary";
import CircularTimer from "./CircularTimer";
import LiveScore from "./LiveScore";
import ScoreFormatter from "./ScoreFormatter";
import {
  getInitialDifficultyFactor,
  updateScoreArrayAndHighScore,
  selectNewWord,
  getNewRoundTime,
  getDifficultyLevel,
  setDifficultyLevelIfNeeded,
  getDictionary,
} from "../Utilities/Util";

export default function MainBodyPage({ callBack, isStopGame }) {
  const [difficultyLevel, setDifficultyLevel] = useState(
    window.sessionStorage.getItem("difficultyLevel")
  );
  const [difficultyFactor, setDifficultyFactor] = useState(
    getInitialDifficultyFactor(difficultyLevel)
  );
  const [selectedDictionary, setDictionary] = useState(
    dictionaryObject[difficultyLevel]
  );
  const [currentWord, setCurrentWord] = useState(
    selectNewWord(selectedDictionary)
  );
  const [roundTime, setRoundTime] = useState(
    getNewRoundTime(currentWord, difficultyFactor)
  );
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameScore, setGameScore] = useState(0);

  const wordTypedCorrectly = () => {
    const newDifficultyFactor = difficultyFactor + 0.01;
    const newDifficultyLevel = getDifficultyLevel(newDifficultyFactor);
    setDifficultyLevelIfNeeded(newDifficultyLevel);
    const newSelectedDictionary = getDictionary(newDifficultyFactor);
    const newWord = selectNewWord(newSelectedDictionary);
    const newRoundTime = getNewRoundTime(newWord, newDifficultyFactor);

    setDifficultyFactor(newDifficultyFactor);
    setDifficultyLevel(newDifficultyLevel);
    setDictionary(newSelectedDictionary);
    setRoundTime(newRoundTime);
    setCurrentWord(newWord);
  };

  const gameEnded = (elapsedTime) => {
    updateScoreArrayAndHighScore(elapsedTime);
    setGameScore(ScoreFormatter(elapsedTime));
  };

  const roundTimeOver = () => {
    setIsGameOver(true);
    setRoundTime(0);
    const gameCount = window.sessionStorage.getItem("gameCount");
    window.sessionStorage.setItem("gameCount", Number(gameCount) + 1);
  };

  useEffect(() => {
    if (gameScore !== 0) {
      callBack(gameScore);
    }
  }, [gameScore, callBack]);

  useEffect(() => {
    if (isStopGame) {
      roundTimeOver();
    }
  }, [isStopGame]);

  if (currentWord === "") {
    return null;
  } else {
    return (
      <div>
        <div>
          <Header level={difficultyLevel} />
          <LiveScore isGameOver={isGameOver} callBack={gameEnded} />
        </div>
        <div className="mainPageBody-section">
          <ScoreBoard />
          <div className="timerWord-section">
            <CircularTimer
              roundTime={roundTime}
              endTime={roundTime + Date.now()}
              callBack={roundTimeOver}
            />
            <WordSection
              currentWord={currentWord}
              callBack={wordTypedCorrectly}
            />
          </div>
        </div>
      </div>
    );
  }
}
