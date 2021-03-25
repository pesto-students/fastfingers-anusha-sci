import React, { useState, useEffect } from "react";
import "./HomePage.scss";
import { FaPlay } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import MainPage from "../MainPage/MainPage";
import GameLogo from "./GameLogo";
import Dropdown from "./Dropdown";

const ENTER_KEY_CHAR_CODE = 13;

export default function Homepage({ nameOfPlayer }) {
  const [playerName, setPlayerName] = useState(nameOfPlayer);
  const [difficultyLevel, setDifficultyLevel] = useState("EASY");
  const [isStarted, setIsStarted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const sound = new Audio("/keyboardPress-clickTrimmed.mp3");
  function playSound() {
    sound.play();
  }

  window.sessionStorage.setItem("playerName", playerName.toUpperCase());
  window.sessionStorage.setItem("difficultyLevel", difficultyLevel);

  useEffect(() => {
    setPlayerName(nameOfPlayer);
  }, [nameOfPlayer]);

  const handleNameChange = (e) => {
    setPlayerName(e.target.value.toUpperCase());
  };

  const toShowDropdown = () => {
    setShowDropdown(true);
  };
  const handleDifficultyLevel = (levelSelected) => {
    setDifficultyLevel(levelSelected);
    setShowDropdown(false);
  };

  const handleIsStarted = (e) => {
    if (playerName) {
      setIsStarted(true);
      window.sessionStorage.setItem("startTime", Date.now());
      window.sessionStorage.setItem("gameCount", 0);
      window.sessionStorage.setItem("scoreArray", JSON.stringify([]));
      window.sessionStorage.setItem("highestScore", JSON.stringify({}));
    } else {
      setErrorMessage("Please enter your name.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.charCode !== ENTER_KEY_CHAR_CODE) {
      playSound();
    }
    if (e.charCode === ENTER_KEY_CHAR_CODE) {
      handleIsStarted();
    }
  };

  return isStarted ? (
    <MainPage />
  ) : (
    <div>
      <GameLogo />
      <div className="form-section">
        <form action="">
          <div className="nameAndError-section">
            <input
              type="text"
              id="player-name"
              name="player-name"
              placeholder="TYPE YOUR NAME"
              value={playerName}
              onChange={handleNameChange}
              onKeyPress={handleKeyPress}
              autoComplete="off"
              required
            />
            <p>{errorMessage}</p>
          </div>
          <div>
            <input
              type="text"
              name="difficulty_level"
              id="difficulty_level"
              onClick={toShowDropdown}
              value={difficultyLevel}
            />
            <span>
              <FaCaretDown className="dropdown-icon" onClick={toShowDropdown} />
            </span>
            {showDropdown && (
              <>
                <Dropdown callBack={handleDifficultyLevel} />
              </>
            )}
          </div>
        </form>
      </div>
      <div className="start-section">
        <FaPlay fontSize="1.5rem" onClick={handleIsStarted} cursor="pointer" />
        <h2 onClick={handleIsStarted}>START GAME</h2>
      </div>
    </div>
  );
}
