import React, { useState } from "react";
import "./HomePage.scss";
import { FaPlay } from "react-icons/fa";
import MainPage from "../MainPage/MainPage";
import GameLogo from "./GameLogo"

const ENTER_KEY_CHAR_CODE = 13

export default function Homepage() {
  const [playerName, setPlayerName] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("EASY");
  const [isStarted, setIsStarted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  window.sessionStorage.setItem("playerName" , playerName.toUpperCase())
  window.sessionStorage.setItem("difficultyLevel" , difficultyLevel)
  

  const handleNameChange = (e) => {
    setPlayerName(e.target.value);
  };

  const handleDifficultyLevel = (e) => {
    setDifficultyLevel(e.target.value);
  };

  const handleIsStarted = (e) => {
    if (playerName) {
      setIsStarted(true);
      window.sessionStorage.setItem("startTime", Date.now())
      window.sessionStorage.setItem("gameCount", 0)
      window.sessionStorage.setItem("scoreArray", JSON.stringify([]))
      window.sessionStorage.setItem("highestScore", JSON.stringify({}) )
    } else {
      setErrorMessage("Please enter your name.");
    }
  };

  const handleKeyPress = (e)=> {
    if (e.charCode === ENTER_KEY_CHAR_CODE){
      handleIsStarted()
    }
  }

  return isStarted ? (
    <MainPage />
  ) : (
  
    <div>
    <GameLogo/>
      <div className="form-section">
        <form action="">
          <div>
            <input
              type="text"
              id="player-name"
              name="player-name"
              placeholder="TYPE YOUR NAME"
              value={playerName.toUpperCase()}
              onChange={handleNameChange}
              onKeyPress ={handleKeyPress}
              required
            />
            <p>{errorMessage}</p>
          </div>
          <div>
            <select
              name="difficulty_level"
              id="difficulty_level"
              onChange={handleDifficultyLevel}
              defaultValue = {difficultyLevel}
            >
              <option value="EASY">EASY</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HARD">HARD</option>
            </select>
          </div>
        </form>
      </div>
      <div className="start-section">
        <FaPlay
          fontSize="1.5rem"
          onClick={handleIsStarted}
          cursor="pointer"
        />
        <h2 onClick={handleIsStarted}>START GAME</h2>
      </div>
    </div>
  );
}
