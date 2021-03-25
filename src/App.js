import React from "react";
import "./App.css";
import HomePage from "./Components/HomePage/HomePage";
import Player from "./Components/HomePage/Player";

function App() {
  return (
    <div className="App">
      <HomePage nameOfPlayer="" />
      <Player url="/bg1.mp3" repeat={true} />
    </div>
  );
}

export default App;
