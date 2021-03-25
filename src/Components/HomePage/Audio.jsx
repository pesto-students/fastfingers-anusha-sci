import { useState, useEffect } from "react";

function useAudio(url1, repeat) {
  const [url, setUrl] = useState(url1);
  const [audio, setAudio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    const newAudio = new Audio(url);
    newAudio.volume = 0.1;
    setAudio(newAudio);
  }, [url]);

  useEffect(() => {
    audio.volume = 0.1;
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

  return [playing, toggle, setUrl];
}

export default useAudio;
