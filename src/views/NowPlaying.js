import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getMyCurrentPlayingTrack } from "../redux/trackInfo";
import { getPlaybackState } from "../redux/playbackStatus";

const NowPlaying = () => {

  const dispatch = useDispatch();

  const playbackState = dispatch(getPlaybackState());

  return (
    <div>
      <h1>Now Playing</h1>
    </div>
  )
};

export default NowPlaying;
