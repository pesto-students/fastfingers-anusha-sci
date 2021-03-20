import React from "react";
import "./GameLogo.scss";
import { FaKeyboard } from "react-icons/fa";

function GameLogo() {
  return (
    <div className="game-logo">
      <FaKeyboard fontSize="8rem" />
      <h1>fast fingers</h1>
      <div id="tag-line">
        <hr />
        <p>the ultimate typing game</p>
        <hr />
      </div>
    </div>
  );
}

export default GameLogo;
