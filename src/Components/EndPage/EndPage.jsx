import React, {useState} from "react"
import Header from "../MainPage/Header"
import MainPage from "../MainPage/MainPage"
import "./EndPage.scss"
import {FaRedoAlt} from "react-icons/fa"


export default function EndPage({gameScore}) {
  const [isPlayAgain , setIsPlayAgain] = useState(false)
  

  const handlePlayAgain = ()=>{
    window.sessionStorage.setItem("startTime", Date.now())
    setIsPlayAgain(true)
  }

  const handleQuitGame =()=>{
    window.sessionStorage.clear()
  }

return isPlayAgain ? (
  <MainPage/>
):(
  <div>
    <Header/>
    <div className="score-display">
    <h2>SCORE : GAME {window.sessionStorage.getItem("gameCount")} </h2>
    <h1>{gameScore}</h1>
    </div>
    <div className="playAgain-section">
      <FaRedoAlt onClick = {handlePlayAgain}/>
      <h2 onClick={handlePlayAgain}>PLAY AGAIN</h2>
    </div>
    <h2 id ="quit" onClick ={handleQuitGame}>QUIT</h2>
  </div>
)



}