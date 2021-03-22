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
            <FaUser />
            {playerName}
          </p>
          <p>
            <FaGamepad /> LEVEL: {level}
          </p>
        </div>
        <div>
          <p className="game-title">fast fingers</p>
        </div>
      </div>
    );
  }



