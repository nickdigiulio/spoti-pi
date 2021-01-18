var SpotifyWebApi = require('spotify-web-api-node');

const SPOTIFY_CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const SPOTIFY_REDIRECT_URL = process.env.REACT_APP_SSPOTIFY_REDIRECT_URL;

const SET_AUTH_URL = "SET_AUTH_URL";

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
    // Create the authorization URL
    var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

    // https://accounts.spotify.com:443/authorize?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https://example.com/callback&scope=user-read-private%20user-read-email&state=some-state-of-my-choice
    console.log(authorizeURL);
    dispatch({type: SET_AUTH_URL, payload: {apiObject: spotifyApi, url: authorizeURL}})
  };
};

export const getAuthToken = (authCode) => {
  return (dispatch, getState) => {
    const spotifyApi = getState().auth.spotifyApi;
    spotifyApi.authorizationCodeGrant(authCode).then(
      function(data) {
        console.log('The token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);
        console.log('The refresh token is ' + data.body['refresh_token']);

        // Set the access token on the API object to use it in later calls
        spotifyApi.setAccessToken(data.body['access_token']);
        spotifyApi.setRefreshToken(data.body['refresh_token']);
        dispatch({type: SET_AUTH_URL, apiObject: spotifyApi})
      },
      function(err) {
        console.log('Something went wrong!', err);
      }
    );
  }
}

export default authReducer;
