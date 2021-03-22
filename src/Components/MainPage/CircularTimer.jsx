import React, {useEffect, useState} from "react"
import "./CircularTimer.scss"


export default function CircularTimer1({roundTime , endTime, callBack}) {

  
  const [strokeDashoffset , setStrokeDashoffset] = useState(440)
  
  useEffect(()=>{
    
    setStrokeDashoffset(440)
  },[roundTime])
 

  useEffect(()=>{
    if (roundTime){
      const interval = setInterval(() => {
        setStrokeDashoffset( 440 - ((roundTime-(endTime-Date.now()))* (440/roundTime))  )
           
        if ((endTime - Date.now()) <= 0) {
          clearInterval(interval);
          setStrokeDashoffset(440)
          callBack()
        } 
  
        
      }, 100);
      return ()=>{
        if (interval){
          clearInterval(interval)
        }
    }


    }

  },[roundTime,endTime])

  let timeRemaining = Math.max(0,endTime -Date.now())
  let remainingSeconds = Math.floor( timeRemaining/1000)
  let remainingMilliseconds = Math.floor((timeRemaining % 1000)/10)
  if (remainingMilliseconds < 10){
    remainingMilliseconds = `0${remainingMilliseconds }`
  }
 


  return  (
    <div className="item">
        <h2>{`${remainingSeconds} : ${remainingMilliseconds}`}</h2>

        <svg id="circle-svg" width="160" height="160">
          <circle
            id="circle-anime"
            r="69.85699"
            cy="81"
            cx="81"
            strokeWidth="8"
            stroke="grey"
            fill="none"
          ></circle>
          <circle
            id="circle-anime-bg"
            r="69.85699"
            cy="81"
            cx="81"
            strokeWidth="8"
            stroke="#ff5155"
            fill="none"
            strokeDashoffset={strokeDashoffset.toFixed()}
            strokeDasharray="440"
            
         
          ></circle>
        </svg>
      </div>
    
  )

}