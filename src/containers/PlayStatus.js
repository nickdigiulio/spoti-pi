import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMyCurrentPlayingTrack } from "../redux/trackInfo";

const PlayStatus = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyCurrentPlayingTrack());
  }, [dispatch]);

  return (<div/>)
};

export default PlayStatus;
