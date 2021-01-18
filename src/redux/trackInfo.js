var SpotifyWebApi = require('spotify-web-api-node');

const SPOTIFY_CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REDIRECT_URL = process.env.REACT_APP_SSPOTIFY_REDIRECT_URL;

const INIT_GET_TRACK_INFO = "INIT_GET_TRACK_INFO";
const SET_TRACK_INFO = "SET_TRACK_INFO";
const GET_TRACK_INFO_FAILED = "GET_TRACK_INFO_FAILED";


// Action Reducer
const initState = {
  loading: false,
  playStatus: "",
  artistName: "",
  trackName: "",
  albumName: "",
  albumArt: null
}

const trackInfoReducer = (state = initState, action) => {
  switch(action.type){
    case INIT_GET_TRACK_INFO:
      return {
        ...state,
        loading: true
      }

    case SET_TRACK_INFO:
      return {
        ...state,
        loading:false,
        playStatus: action.payload.playStatus,
        artistName: action.payload.artistName,
        trackName: action.payload.trackName,
        albumName: action.payload.albumName,
        albumArt: action.payload.albumArt
      }

    case GET_TRACK_INFO_FAILED:
        return initState

    default:
      return state
  }
};

export const getMyCurrentPlayingTrack = () => {
  return (dispatch) => {
    dispatch({type: INIT_GET_TRACK_INFO})
    var spotifyApi = new SpotifyWebApi({
      clientId: SPOTIFY_CLIENT_ID,
      clientSecret: SPOTIFY_CLIENT_SECRET,
      redirectUri: SPOTIFY_REDIRECT_URL
    });
    spotifyApi.getMyCurrentPlayingTrack()
    .then(function(data) {
      const payload = {
        artistName: data.body.item.artists.name,
        trackName: data.body.name,
        albumName: data.body.item.album.name,
        albumArt: data.body.item.album.images[0].url
      }
      dispatch({type: SET_TRACK_INFO, payload: payload})
    }, function(err) {
      dispatch({type: GET_TRACK_INFO_FAILED})
      console.log('Something went wrong!', err);
    });
  }
}

export default trackInfoReducer;
