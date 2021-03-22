import React, { useEffect, useState} from "react";
import "./WordSection.scss"

function updateHighlightColors(arr, charIndex, color) {
  return arr.map((char, index) => {
    if (index < charIndex) {
      return char;
    } else if (index === charIndex) {
      return color;
    } else {
      return "white";
    }
  });
}

export default function WordSection({ currentWord, callBack }) {
  
  const [highlightColors, setHighlightColors] = useState([])
  
  const [userInput, setUserInput] = useState("");
 
  const wordInputRef = React.createRef()

  useEffect(()=>{
    setHighlightColors(new Array(currentWord.length).fill("white"))
  },[currentWord])

  useEffect(() => {
    if (userInput === currentWord) {
      setUserInput("")
      callBack();
    }
  },[callBack, userInput, currentWord]);

  useEffect(()=>{
    wordInputRef.current.focus()
  })



  const handleInputWord = (e) => {
    const inputLength = e.target.value.length;
    const currentInputChar = e.target.value.charAt(inputLength - 1);
    var colorArray1 = highlightColors;
    if (currentInputChar === currentWord.charAt(inputLength - 1)) {
      colorArray1 = updateHighlightColors(
        colorArray1,
        inputLength - 1,
        "green"
      );
    } else {
      colorArray1 = updateHighlightColors(
        colorArray1,
        inputLength - 1,
        "red"
      );
    }

    setUserInput(e.target.value);
    setHighlightColors(colorArray1);
  };

  const letterArray = currentWord.split("").map((char, index) => {
    const color = highlightColors[index];
    return (
      <span id={index} className={color}>
        {char}
      </span>
    );
  });

  return (
    <div className="word-section">
      <h1>{letterArray}</h1>
      <input type="text" value={userInput} onChange={handleInputWord} ref = {wordInputRef} />
    </div>
  );
}

