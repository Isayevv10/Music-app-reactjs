import React from "react";
import "../css/navbar.css";
import { HiMusicNote } from "react-icons/hi";
import { SlMusicToneAlt } from "react-icons/sl";

const Navbar = ({ showSidebar, setShowSidebar }) => {
  return (
    <div>
      <div className='navbar'>
        <div>Waves</div>
        <div className='library' onClick={() => setShowSidebar(!showSidebar)}>
          {showSidebar ? (
            <div className='btn-open'>
              <p>Library</p>
              <SlMusicToneAlt />
            </div>
          ) : (
            <div className='btn-close'>
              <p>Library</p>
              <HiMusicNote />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
