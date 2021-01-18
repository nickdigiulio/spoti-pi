import React, { useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps, useHistory, useLocation } from "react-router-dom";
import { getAuthURL, getAuthToken } from "../redux/auth";
import queryString from 'query-string';
var SpotifyWebApi = require('spotify-web-api-node');

const Connect = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  useLayoutEffect(() => {
    dispatch(getAuthURL());
  }, [dispatch]);

  const { search } = useLocation();
  let params = queryString.parse(search);
  console.log(params);
  if ( params.code !== undefined ) {
    dispatch(getAuthToken(params.code));
    // history.push(`/now_playing`);
  }


  const authUrl = useSelector((state) => state.auth.authUrl);

  return (
    <div>
      <h1><a href={authUrl}>Connect</a></h1>
    </div>
  )
};

export default Connect;
