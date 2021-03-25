import React, { useState } from "react";
import Header from "../MainPage/Header";
import MainPage from "../MainPage/MainPage";
import "./EndPage.scss";
import { FaRedoAlt } from "react-icons/fa";
import Homepage from "../HomePage/HomePage";

export default function EndPage({ gameScore }) {
  const [isPlayAgain, setIsPlayAgain] = useState(false);
  const [isQuitGame, setIsQuitGame] = useState(false);

  const handlePlayAgain = () => {
    window.sessionStorage.setItem("startTime", Date.now());
    setIsPlayAgain(true);
  };

  const handleQuitGame = () => {
    setIsQuitGame(true);
  };

  if (isPlayAgain) {
    return <MainPage />;
  } else if (isQuitGame) {
    return (
      <Homepage nameOfPlayer={window.sessionStorage.getItem("playerName")} />
    );
  }
  return (
    <div>
      <Header />
      <div className="endPage-body">
        <div className="score-display">
          <h2>SCORE : GAME {window.sessionStorage.getItem("gameCount")} </h2>
          <h1>{gameScore}</h1>
        </div>
        <div className="playAgain-section">
          <i>
            <FaRedoAlt
              onClick={handlePlayAgain}
              cursor="pointer"
              fontSize="1.5rem"
            />
          </i>
          <h2 onClick={handlePlayAgain}>PLAY AGAIN</h2>
        </div>
      </div>
      <div className="quit-section">
        <h2 onClick={handleQuitGame}>
          <span>QUIT</span>
        </h2>
      </div>
    </div>
  );
}
