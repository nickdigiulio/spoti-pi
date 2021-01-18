import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getMyCurrentPlayingTrack } from "../redux/trackInfo";

const NowPlaying = () => {

  const isPlaying = useSelector((state) => state.trackInfo.isPlaying);
  const trackData = useSelector((state) => state.trackInfo.track);

  const history = useHistory();

  if ( !isPlaying ) {
    console.log(isPlaying);
    history.push("/clock");
  }

  return (
    <div>
      <h1>Now Playing</h1>
      <div>
          {isPlaying === false ? "" :
          (
            <div>
              <h1>{trackData.artistName}</h1>
              <h1>{trackData.trackName}</h1>
              <h1>{trackData.albumName}</h1>
              <img src={trackData.albumArt} alt={trackData.albumName} />
            </div>
          )}
      </div>
    </div>
  )
};

export default NowPlaying;
