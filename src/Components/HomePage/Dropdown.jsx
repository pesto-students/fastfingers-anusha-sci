import React from "react";
import "./Dropdown.scss";

export default function Dropdown({ callBack }) {
  const handleLevelClick = (e) => {
    callBack(e.target.id);
  };

  return (
    <div className="dropdown-section">
      <ul>
        <li key="easy" id="EASY" onClick={handleLevelClick}>
          EASY
        </li>
        <li key="medium" id="MEDIUM" onClick={handleLevelClick}>
          MEDIUM
        </li>
        <li key="hard" id="HARD" onClick={handleLevelClick}>
          HARD
        </li>
      </ul>
    </div>
  );
}
