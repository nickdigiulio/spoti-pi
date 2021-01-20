import React, { useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAuthURL } from "../redux/auth";
import { SET_BACKGROUND_COLOR } from "../redux/background";

const Connect = () => {

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(getAuthURL());
    dispatch({type: SET_BACKGROUND_COLOR, payload: { background: "#c074b2" }})
  }, [dispatch]);

  const authUrl = useSelector((state) => state.auth.authUrl);

  return (
    <section class="authorise active" id="auth">
      <h1 class="connect">Connect to Spotify</h1>
      <a href={authUrl} class="btn" id="connect">Connect</a>
    </section>
  )
};

export default Connect;
