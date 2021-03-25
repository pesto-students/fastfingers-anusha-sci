import React, { useEffect } from "react";
import useAudio from "./Audio";
import "./Player.scss";
import { FaVolumeUp } from "react-icons/fa";
import { FaVolumeMute } from "react-icons/fa";

function Player({ url, repeat }) {
  const [playing, toggle, setUrl] = useAudio(url, repeat);

  useEffect(() => {
    setUrl(url);
  }, [setUrl, url]);

  return (
    <div>
      <button className="playMusic" onClick={toggle}>
        {playing ? (
          <FaVolumeMute fontSize="2rem" />
        ) : (
          <FaVolumeUp fontSize="2rem" />
        )}
      </button>
    </div>
  );
}

export default Player;
