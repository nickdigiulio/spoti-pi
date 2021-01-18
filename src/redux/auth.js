var SpotifyWebApi = require('spotify-web-api-node');

const SPOTIFY_CLIENT_ID = "4f1e242bd90741eba129ed1254ad9231"; //process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = "bcda816ccb014a9397ca73df780b7f42"; //process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REDIRECT_URL = "https://nowify.nickdigiulio.com/#/connect"; //process.env.REACT_APP_SSPOTIFY_REDIRECT_URL;

const SET_AUTH_URL = "SET_AUTH_URL";
const SET_AUTH_TOKEN = "SET_AUTH_TOKEN";

const initState = {
  loading: false,
  authUrl: "",
  authCode: "",
  spotifyApi: {},
};

const authReducer = (state = initState, action) => {
  switch(action.type){
    case SET_AUTH_URL:
      return {
        ...state,
        loading: false,
        spotifyApi: action.payload.apiObject,
        authUrl: action.payload.url
      }

    case SET_AUTH_TOKEN:
      return {
        ...state,
        loading: false,
        spotifyApi: action.payload
      }

    default:
      return state
  }
};

export const getAuthURL = () => {
  return (dispatch) => {
    // Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
    var spotifyApi = new SpotifyWebApi({
      redirectUri: SPOTIFY_REDIRECT_URL,
      clientId: SPOTIFY_CLIENT_ID
    });
    const scopes = ['user-read-playback-state',
                    'user-modify-playback-state',
                    'user-read-currently-playing'];
    const state = 'some-state-of-my-choice';
    const showDialog = true;
    const responseType = 'token';
    // Create the authorization URL
    var authorizeURL = spotifyApi.createAuthorizeURL(
      scopes,
      state,
      showDialog,
      responseType
    );

    // https://accounts.spotify.com:443/authorize?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https://example.com/callback&scope=user-read-private%20user-read-email&state=some-state-of-my-choice
    console.log(authorizeURL);
    dispatch({type: SET_AUTH_URL, payload: {apiObject: spotifyApi, url: authorizeURL}})
  };
};

export const getAuthToken = (authCode) => {
  return (dispatch, getState) => {
    var spotifyApi = getState().auth.spotifyApi;
    var credentials = {
      clientId: SPOTIFY_CLIENT_ID,
      clientSecret: SPOTIFY_CLIENT_SECRET,
      //Either here
      accessToken: authCode
    };
    var spotifyApi = new SpotifyWebApi(credentials);
    spotifyApi.setAccessToken(authCode);
    console.log(JSON.stringify(spotifyApi));
    dispatch({type: SET_AUTH_TOKEN, apiObject: spotifyApi});
    spotifyApi.getMyCurrentPlaybackState()
      .then(function(data) {
        // Output items
        if (data.body && data.body.is_playing) {
          console.log("User is currently playing something!");
        } else {
          console.log("User is not playing anything, or doing so in private.");
        }
      }, function(err) {
        console.log('Something went wrong!', err);
      });
  }
}

export default authReducer;
