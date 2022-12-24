import React, { useState } from "react";
import useDebounce from "../hooks/useDebounce";
import "../css/sidebar.css";

const Sidebar = ({ songData, setCurrentMusic, setPlaying, showSidebar }) => {
  const [inputVal, setInputVal] = useState("");
  const debounceInput = useDebounce(inputVal, 600);

  const chooseMusic = (id) => {
    const indexOfItem = songData.findIndex((item) => item.id === id);
    setCurrentMusic(songData[indexOfItem]);
    setPlaying(true);
  };

  const search = [...songData].filter((item) => {
    if (inputVal !== "") {
      return (
        item.name.toLowerCase().indexOf(debounceInput.toLowerCase()) !== -1 ||
        item.artist.toLowerCase().indexOf(debounceInput.toLowerCase()) !== -1
      );
    } else {
      return item;
    }
  });

  return (
    <div>
      <div className={`${showSidebar ? "sidenav" : "container-sidebar"}`}>
        <p className='header'>LIBRARY</p>
        <input
          type='search'
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder='search music...'
          className='searchInput'
        />
        {search.map((song) => {
          return (
            <div
              key={song.id}
              onClick={() => chooseMusic(song.id)}
              className='trackList'
            >
              <div className='coverImg'>
                <img src={song.cover} alt='cover' />
              </div>
              <div>
                <p>{song.name}</p>
                <p>{song.artist}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
