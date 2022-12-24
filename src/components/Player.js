import React, { useEffect, useState } from "react";
import "../css/player.css";

import { GrNext, GrPrevious, GrVolume, GrVolumeMute } from "react-icons/gr";
import { FaPlay, FaPause } from "react-icons/fa";
import { RiRestartLine } from "react-icons/ri";

import "../css/player.css";

const Player = ({
  songData,
  audioEl,
  currentMusic,
  setCurrentMusic,
  volume,
  setVolume,
  playing,
  setPlaying,
}) => {
  const [track, setTrack] = useState(0);

  const [fullTime, setFullTime] = useState("");

  const [speed, setSpeed] = useState(1);

  const playPause = () => {
    setPlaying(!playing);
  };

  useEffect(() => {
    if (playing) {
      audioEl.current.play();
    } else {
      audioEl.current.pause();
    }
  }, [playing, currentMusic]);

  useEffect(() => {
    audioEl.current.currentTime = track;
    const ctime = audioEl.current.currentTime;
    const fullTime = audioEl?.current?.duration;
    setCurrentMusic({ ...currentMusic, range: ctime });

    audioEl.current.onloadedmetadata = () => {
      setFullTime(audioEl.current.duration);
    };
  }, [audioEl.current, track]);

  useEffect(() => {
    audioEl.current.volume = volume / 100;
    audioEl.current.playbackRate = speed;
  }, [volume, speed]);

  const reStartMusic = () => {
    audioEl.current.currentTime = 0;
    audioEl.current.play();
  };
  const goPrev = () => {
    const index = songData.findIndex((item) => item.id === currentMusic.id);
    if (index === 0) {
      setCurrentMusic(songData[songData.length - 1]);
    } else {
      setCurrentMusic(songData[index - 1]);
    }
    audioEl.current.currentTime = 0;
  };

  const goNext = () => {
    const index = songData.findIndex((item) => item.id === currentMusic.id);
    if (index === songData.length - 1) {
      songData[0].range = 0;
      setCurrentMusic(songData[0]);
    } else {
      songData[index + 1].range = 0;
      setCurrentMusic(songData[index + 1]);
    }

    audioEl.current.currentTime = 0;
  };

  return (
    <div className='player-container'>
      <div className='player-detail'>
        <div
          className='player-img'
          style={{
            transform: `rotate(
              ${(currentMusic.range / currentMusic.length) * 1800}deg
            )`,
          }}
        >
          <img src={currentMusic.cover} alt='cover' />
        </div>

        <p className='musicName'>{currentMusic.name}</p>
        <p className='musicArtist'>{currentMusic.artist}</p>
      </div>

      <div className='track-range'>
        <input
          type='range'
          min={0}
          max={currentMusic.length ? currentMusic.length : 0}
          onInput={(e) => setTrack(+e.target.value)}
          className='trackLength'
          value={currentMusic?.range ? currentMusic.range : 0}
          style={{
            background: `linear-gradient(to right, ${currentMusic.color[0]} ,${currentMusic.color[1]})`,
          }}
        />
      </div>

      <div className='track-time'>
        <div className='currentTime'>
          {audioEl?.current?.currentTime
            ? `${Math.floor(audioEl.current.currentTime / 60)} : ${Math.round(
                audioEl.current.currentTime % 60
              )}`
            : 0}
        </div>
        <div className='duration'>
          {audioEl?.current?.duration
            ? `${Math.floor(fullTime / 60)} : ${Math.round(fullTime % 60)}`
            : 0}
        </div>
      </div>

      <div className='audioSpeed'>
        <div onClick={() => setSpeed(0.5)}>0.5x</div>
        <div onClick={() => setSpeed(0.75)}>0.75x</div>
        <div onClick={() => setSpeed(1)}>1x</div>
        <div onClick={() => setSpeed(1.5)}>1.5x</div>
        <div onClick={() => setSpeed(2)}>2x</div>
      </div>

      <div className='btns'>
        <div className='restart'>
          <RiRestartLine
            onClick={() => reStartMusic()}
            className='restartBtn'
          />
        </div>
        <div className='buttons'>
          <GrPrevious onClick={goPrev} />
          {playing ? (
            <FaPlay onClick={playPause} />
          ) : (
            <FaPause onClick={playPause} />
          )}

          <GrNext onClick={goNext} />
        </div>

        <div className='volume'>
          {audioEl?.current?.volume === 0 ? <GrVolumeMute /> : <GrVolume />}
          <input
            type='range'
            className='volumeInput'
            min={0}
            max={100}
            onInput={(e) => setVolume(+e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
