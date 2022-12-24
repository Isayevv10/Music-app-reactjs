import { useRef, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Player from "./components/Player";
import Sidebar from "./components/Sidebar";
import { data } from "./data.js";

function App() {
  const [songData, setSongData] = useState(data);
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentMusic, setCurrentMusic] = useState(songData[0]);
  const [volume, setVolume] = useState(50);
  const [playing, setPlaying] = useState(false);

  const audioEl = useRef();

  const onplaying = () => {
    const fullTime = audioEl.current.duration;
    const ctime = audioEl.current.currentTime;

    setCurrentMusic({
      ...currentMusic,
      range: ctime,
      length: fullTime,
    });
  };

  return (
    <div className={`${showSidebar ? "openNav" : "closeNav"}`}>
      <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      <Sidebar
        songData={songData}
        setCurrentMusic={setCurrentMusic}
        currentMusic={currentMusic}
        setPlaying={setPlaying}
        showSidebar={showSidebar}
      />

      <audio
        src={currentMusic.audio}
        ref={audioEl}
        onTimeUpdate={onplaying}
        preload='metadata'
      />
      <Player
        songData={songData}
        audioEl={audioEl}
        setSongData={setSongData}
        currentMusic={currentMusic}
        setCurrentMusic={setCurrentMusic}
        audioElement={audioEl}
        volume={volume}
        setVolume={setVolume}
        playing={playing}
        setPlaying={setPlaying}
      />
    </div>
  );
}

export default App;
