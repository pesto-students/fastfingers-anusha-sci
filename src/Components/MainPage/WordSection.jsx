import React from "react";
import "./WordSection.scss";

class WordSection extends React.Component {
  constructor(props) {
    console.log("Word Section Constructor called");
    super(props);
    this.state = {
      currentWord: this.props.currentWord,
      colorArray: new Array(this.props.currentWord.length).fill("black"),
      userInput: ""
    };
  }

  updateColorArrayWithHighlight(arr, charIndex, color) {
    return arr.map((char, index) => {
      if (index < charIndex) {
        return char;
      } else if (index === charIndex) {
        return color;
      } else {
        return "black";
      }
    });
  }

  componentDidUpdate() {
    if (this.state.currentWord !== this.props.currentWord) {
      this.setState({
        currentWord: this.props.currentWord,
        colorArray: new Array(this.props.currentWord.length).fill("black"),
        userInput: ""
      });
    }
  }

  handleInputWord = (e) => {
    const inputLength = e.target.value.length;
    const currentInputChar = e.target.value.charAt(inputLength - 1);
    var colorArray = this.state.colorArray;
    if (currentInputChar === this.state.currentWord.charAt(inputLength - 1)) {
      colorArray = this.updateColorArrayWithHighlight(
        colorArray,
        inputLength - 1,
        "green"
      );
    } else {
      colorArray = this.updateColorArrayWithHighlight(
        colorArray,
        inputLength - 1,
        "red"
      );
    }

    this.setState({ colorArray: colorArray, userInput: e.target.value }, () => {
      if (this.state.userInput === this.state.currentWord) {
        this.props.callBack();
      }
    });
  };

  render() {
    
    const colorArray = this.state.colorArray;
    const letterArray = this.state.currentWord.split("").map((char, index) => {
      const color = colorArray[index];
      return (
        <span id={index} className={color}>
          {char}
        </span>
      );
    });

    return (
      <div className="word-section">
        <h1>{letterArray}</h1>
        <input
          type="text"
          value={this.state.userInput}
          onChange={this.handleInputWord}
        />
      </div>
    );
  }
}

export default WordSection;
