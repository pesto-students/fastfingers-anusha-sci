import React, {useState} from "react"
import MainPageBody from "./MainPageBody";
import {FaTimes} from "react-icons/fa"
import "./MainPage.scss"
import EndPage from "../EndPage/EndPage"


function MainPage() {
  const [isStopGame , setIsStopGame] = useState(false)
  const [showEndPage, setShowEndPage] = useState(false)
  const [gameScore , setGameScore] = useState(0)
  

  const handleGameStop = () =>{
    setIsStopGame(true)
  }
  const gameEnded = (score)=>{
    setGameScore(score)
    setShowEndPage(true)
  }

  return showEndPage ? (
    <div><EndPage gameScore={gameScore} /> </div>
  ) : (
    <div className="MainPage"> 
      <MainPageBody callBack={gameEnded} isStopGame={isStopGame}/>
      <div className ="stopGame-section">
        <FaTimes
          fontSize="1.5rem"
          onClick={handleGameStop}
          cursor="pointer"
        />
        <h2 onClick = {handleGameStop} >STOP GAME</h2>
      </div>

    </div>
  );
}

export default MainPage;
