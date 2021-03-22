import React, {useEffect, useState} from "react"
import "./LiveScore.scss"
import ScoreFormatter from "./ScoreFormatter"


export default function LiveScore({isGameOver, callBack}){
  const [elapsedTime , setElapsedTime] = useState(0)

  useEffect(()=>{
    const isInterval= setInterval(()=>{
      if(isGameOver && isInterval){
        clearInterval(isInterval)
        callBack(elapsedTime)
      }
      setElapsedTime(Date.now()- sessionStorage.getItem("startTime"))
    },1000)
    return ()=>{
      if (isInterval){
        clearInterval(isInterval)
      }
    }
  },[isGameOver]
  )

  return(
    <div className="liveScore-section">
      <h2>{`SCORE : ${ScoreFormatter(elapsedTime)}`}</h2>
    </div>
  )

}