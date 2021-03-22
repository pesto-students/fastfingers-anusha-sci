import React, {useState,useEffect} from "react";
import "./ScoreBoard.scss";
import ScoreFormatter from "./ScoreFormatter"


export default function ScoreBoard() {

  const [scoreArray, setScoreArray] = useState(JSON.parse(window.sessionStorage.getItem("scoreArray"))) 
  const [highestScore , setHighestScore] = useState(JSON.parse(window.sessionStorage.getItem("highestScore"))["score"])
  const [highScoreIndex, setHighScoreIndex] = useState(JSON.parse(window.sessionStorage.getItem("highestScore"))["index"])
  


  useEffect(()=>{
    setScoreArray(JSON.parse(window.sessionStorage.getItem("scoreArray")))
    setHighestScore(JSON.parse(window.sessionStorage.getItem("highestScore"))["score"])
    setHighScoreIndex(JSON.parse(window.sessionStorage.getItem("highestScore"))["index"])

  } , [])

  
  
  const scoreList = scoreArray.map((item, index)=>{
   return(
     <li key ={index} id ={index} >{`GAME ${index+1} : ${ScoreFormatter(item)} `} </li>
   )
 })

 return (
   <div className="scoreBoard-section">
      <h4>SCORE BOARD</h4>
      <ul>{scoreList}</ul>
      <p>PERSONAL BEST:</p>
      <ul><li key ={scoreArray.length+1} id ={scoreArray.length+1} >{`GAME ${highScoreIndex + 1 } : ${ScoreFormatter(highestScore)} `} </li></ul>
   </div>

 )

 }

