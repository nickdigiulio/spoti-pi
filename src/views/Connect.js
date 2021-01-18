import React, { useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAuthURL } from "../redux/auth";

const Connect = () => {

  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(getAuthURL());
  }, [dispatch]);

  const authUrl = useSelector((state) => state.auth.authUrl);

  return (
    <div>
      <h1><a href={authUrl}>Connect</a></h1>
    </div>
  )
};

export default Connect;
