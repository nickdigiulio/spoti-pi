const INIT_GET_TRACK_INFO = "INIT_GET_TRACK_INFO";
const SET_TRACK_INFO = "SET_TRACK_INFO";
const GET_TRACK_INFO_FAILED = "GET_TRACK_INFO_FAILED";
const SET_PLAYBACK_STATUS = "SET_PLAYBACK_STATUS";


// Action Reducer
const initState = {
  loading: false,
  track: {},
  isPlaying: false
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
        track: {...action.payload},
      }

    case SET_PLAYBACK_STATUS:
      return {
        ...state,
        loading:false,
        isPlaying: action.payload,
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
    const intervalid = setInterval(async function(){
      const response = await fetch('http://localhost:5050/now_playing');
      const data = await response.json();

      if ( Object.keys(data).length > 0 ) {
        const payload = {
          artistName: data.item.artists.name,
          trackName: data.item.name,
          albumName: data.item.album.name,
          albumArt: data.item.album.images[0].url
        }
        dispatch({type: SET_TRACK_INFO, payload: payload});
        dispatch({type: SET_PLAYBACK_STATUS, payload: data.is_playing});
      } else {
        dispatch({type: SET_PLAYBACK_STATUS, payload: false});
      }
    }, 5000);
  }
}

export default trackInfoReducer;
