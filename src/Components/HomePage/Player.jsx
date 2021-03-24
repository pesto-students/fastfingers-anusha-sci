import React from "react";
import useAudio from "./Audio";

function Player({ url, repeat }) {
  const [playing, toggle] = useAudio(url, repeat);

  return (
    <div>
      <button onClick={toggle}>{playing ? "Pause" : "Play"}</button>
    </div>
  );
}

export default Player;
