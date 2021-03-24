import { useState, useEffect } from "react";

function useAudio(url, repeat) {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(true);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing, audio]);

  useEffect(() => {
    audio.addEventListener("ended", () => {
      if (repeat) {
        audio.play();
      } else {
        setPlaying(false);
      }
    });
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, [audio, repeat]);

  return [playing, toggle];
}

export default useAudio;
