const INIT_GET_TRACK_INFO = "INIT_GET_TRACK_INFO";
const SET_TRACK_INFO = "SET_TRACK_INFO";
const GET_TRACK_INFO_FAILED = "GET_TRACK_INFO_FAILED";
const SET_PLAYBACK_STATUS = "SET_PLAYBACK_STATUS";


// Action Reducer
const initState = {
  loading: false,
  track: {
    album: {
      name: 'Loading',
      images: [
        {
          url: '../mstile-150x150.png'
        }
      ]
    },
    name: 'Loading',
    artists: [
      {
        name: 'Now'
      }
    ]
  },
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

const backendUrl = process.env.REACT_APP_ENV === 'dev' ? 'http://localhost:5050' : 'https://nowify-api.nickdigiulio.com';
console.log(backendUrl);

export const getMyCurrentPlayingTrack = () => {
  return (dispatch) => {
    dispatch({type: INIT_GET_TRACK_INFO})
    let fetchFailed = false;
    const intervalid = setInterval(async function(){
      const response = fetch(backendUrl + '/now_playing')
        .then((response) => {
          if ( response.status == 200 ) {
            response.json().then((data) => {
              if ( Object.keys(data).length > 0 ) {
                dispatch({type: SET_TRACK_INFO, payload: data.item});
                dispatch({type: SET_PLAYBACK_STATUS, payload: data.is_playing});
              } else {
                dispatch({type: SET_PLAYBACK_STATUS, payload: false});
              }
            }).catch((err) => {
              console.log("couldn't parse response");
              console.log(err);
            })
          } else if ( response.status == 404 ) {
            console.log("recieved 404 while fetching track info");
            fetch(backendUrl + '/refresh')
            .then(() => {
                console.log("refreshed token");
            }).catch((err) => {
              console.log("couldn't refresh token: "+err);
            })
          }
        }).catch((err) => {
          console.log(err);
        })
    }, 2000);
    if ( fetchFailed ) {
      console.log("fetch failed");
      clearInterval(intervalid);
    }
  }
}


export const trackAction = (action) => {
  return (dispatch) => {
    console.log("action: "+action);
    const response = fetch(backendUrl + '/' + action)
      .then((response) => {
        response.json()
          .then((data) => {
            dispatch({type: SET_TRACK_INFO, payload: data.item});
            dispatch({type: SET_PLAYBACK_STATUS, payload: data.is_playing});
          }).catch((err) => {
            console.log(err);
          })
      })
  };
}

export default trackInfoReducer;
