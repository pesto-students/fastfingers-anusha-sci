import React, { useState, useEffect} from "react";
import ScoreBoard from "./ScoreBoard";
import WordSection from "./WordSection";
import Header from "./Header"
import "./MainPageBody.scss"
import dictionaryObject from "./dictionary";
import CircularTimer from "./CircularTimer"
import LiveScore from "./LiveScore"
import ScoreFormatter from "./ScoreFormatter"

function selectNewWord (selectedDictionary){
  return selectedDictionary[Math.floor(Math.random() * selectedDictionary.length)]
}

function getNewRoundTime (selectedWord, difficultyFactor){
  let roundTime = Number((selectedWord.length/difficultyFactor).toFixed(2))

  if (roundTime < 2){
    return 2*1000  
  }
  return roundTime*1000 
}

function getDictionary(difficultyFactor){
  if (difficultyFactor < 1.5) {
    return dictionaryObject["EASY"];
    }
  if (difficultyFactor < 2) {
     return dictionaryObject["MEDIUM"];
    } 
  return dictionaryObject["HARD"];
}

function getInitialDifficultyFactor(difficultyLevel){
  if (difficultyLevel === "MEDIUM"){
     return 1.5
    }else if(difficultyLevel === "HARD"){
      return 2
    }else{
      return 1
    }

}

function getDifficultyLevel(difficultyFactor){
  if (difficultyFactor < 1.5){
    return "EASY"
  } else if( difficultyFactor < 2){
    return "MEDIUM"
  }else{
    return "HARD"
  }
}

function updateScoreArrayAndHighScore(elapsedTime){
  const newScoreArray = JSON.parse(window.sessionStorage.getItem("scoreArray"))
  console.log("printing newScoreArray", newScoreArray)
  newScoreArray.push(elapsedTime)
  const highScore = Math.max(newScoreArray)
  const indexOfHighScore = newScoreArray.indexOf(highScore)
  console.log("highscore", highScore, "indexOfHighScore" , indexOfHighScore)
  window.sessionStorage.setItem("scoreArray", JSON.stringify(newScoreArray))
  const highestScoreObject = JSON.parse(window.sessionStorage.getItem("highestScore"))
  highestScoreObject["index"] = indexOfHighScore
  highestScoreObject["score"] =  highScore
  window.sessionStorage.setItem("highestScore", JSON.stringify(highestScoreObject))
}

function setDifficultyLevelIfNeeded(difficultyLevel) {
  const sessionDifficultyLevel  = window.sessionStorage.getItem("difficultyLevel");
  if (difficultyLevel !== sessionDifficultyLevel){
    window.sessionStorage.setItem("difficultyLevel", difficultyLevel);
  }
}

export default function MainBodyPage({callBack, isStopGame}){
  const [difficultyLevel, setDifficultyLevel] = useState(window.sessionStorage.getItem("difficultyLevel"))
  const [difficultyFactor , setDifficultyFactor] = useState(getInitialDifficultyFactor(difficultyLevel))
  const [selectedDictionary, setDictionary] = useState(dictionaryObject[difficultyLevel])
  const [currentWord , setCurrentWord] = useState(selectNewWord(selectedDictionary))
  const [roundTime, setRoundTime] = useState(getNewRoundTime(currentWord,difficultyFactor))
  const [isGameOver, setIsGameOver] = useState(false)
  const [gameScore, setGameScore] = useState(0)
  
  
  

  const wordTypedCorrectly = ()=>{
    const newDifficultyFactor = (difficultyFactor + 0.01)
    const newDifficultyLevel = getDifficultyLevel(newDifficultyFactor)
    setDifficultyLevelIfNeeded(newDifficultyLevel)
    const newSelectedDictionary = getDictionary(newDifficultyFactor)
    const newWord = selectNewWord(newSelectedDictionary)
    const newRoundTime = (getNewRoundTime(newWord,newDifficultyFactor))
    
    
    setDifficultyFactor(newDifficultyFactor)
    setDifficultyLevel(newDifficultyLevel)
    setDictionary(newSelectedDictionary)
    setRoundTime(newRoundTime)
    setCurrentWord(newWord)

  }

  const gameEnded = (elapsedTime)=>{
    updateScoreArrayAndHighScore(elapsedTime)
    setGameScore(ScoreFormatter(elapsedTime))
  }

  const roundTimeOver = ()=>{
    console.log("ayush ayush")
    setIsGameOver(true)
    setRoundTime(0)
    const gameCount = window.sessionStorage.getItem("gameCount")
    window.sessionStorage.setItem("gameCount", (Number(gameCount) + 1) )
  }

  useEffect(()=>{
    if (gameScore !== 0){
      callBack(gameScore)
    }  
  },[gameScore,callBack])
  
  useEffect(()=>{
    if(isStopGame){
      roundTimeOver()
    }
  },[isStopGame])

  if(currentWord === ""){
    return null
  } else {
    return (
  <div>
    <div>
      <Header level={difficultyLevel}/>
      <LiveScore isGameOver = {isGameOver} callBack= {gameEnded} />
    </div>
    <div className="mainPageBody-section">
      <ScoreBoard/>
      <div className = "timerWord-section">
      <CircularTimer roundTime ={roundTime} endTime={roundTime + Date.now()} callBack={roundTimeOver} />
        <WordSection  currentWord ={currentWord} callBack ={wordTypedCorrectly} />
      </div>
    </div>
  </div>
)
  }

}

