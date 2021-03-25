import React from "react";
import "./Header.scss";
import { FaUser } from "react-icons/fa";
import { FaGamepad } from "react-icons/fa";


export default function Header() {
  const playerName = window.sessionStorage.getItem("playerName")
  const level =  window.sessionStorage.getItem("difficultyLevel")
    return (
      <div className="header-section">
        <div>
          <p>
            <i><FaUser /></i>
            {playerName}
          </p>
          <p>
            <i><FaGamepad /></i>LEVEL : {level}
          </p>
        </div>
        <div id="game-title">
          <p >fast fingers</p>
        </div>
      </div>
    );
  }



