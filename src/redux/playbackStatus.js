var SpotifyWebApi = require('spotify-web-api-node');

const SPOTIFY_CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REDIRECT_URL = process.env.REACT_APP_SSPOTIFY_REDIRECT_URL;

const INIT_GET_PLAYBACK_STATE = "INIT_GET_PLAYBACK_STATE";
const SET_PLAYBACK_STATE = "SET_PLAYBACK_STATE";
const GET_PLAYBACK_STATE_FAILED = "GET_PLAYBACK_STATE_FAILED";

// Action Reducer
const initState = {
  loading: false,
  active: false
};

const playbackStatusReducer = (state = initState, action) => {
  switch(action.type){
    case INIT_GET_PLAYBACK_STATE:
      return {
        ...state,
        loading: true
      }

    case SET_PLAYBACK_STATE:
      return {
        ...state,
        loading: false,
        active: action.payload
      }

    case GET_PLAYBACK_STATE_FAILED:
        return initState

    default:
      return state
  }
};

export const getPlaybackState = () => {
  return (dispatch, getState) => {
    dispatch({type: INIT_GET_PLAYBACK_STATE})
    const spotifyApi = getState().auth.spotifyApi;
    spotifyApi.getMyCurrentPlaybackState()
      .then(function(data) {
        // Output items
        if (data.body && data.body.is_playing) {
          dispatch({type: SET_PLAYBACK_STATE, payload: true});
        } else {
          dispatch({type: SET_PLAYBACK_STATE, payload: false});
        }
      }, function(err) {
        dispatch({type: GET_PLAYBACK_STATE_FAILED})
        console.log('Something went wrong!', err);
      });
  }
};

export default playbackStatusReducer;
