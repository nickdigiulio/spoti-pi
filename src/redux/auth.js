const SET_AUTH_URL = "SET_AUTH_URL";

const initState = {
  loading: false,
  authUrl: "",
  access_token: "",
  refresh_token: "",
};

const authReducer = (state = initState, action) => {
  switch(action.type){
    case SET_AUTH_URL:
      return {
        ...state,
        loading: false,
        authUrl: action.payload
      }

    default:
      return state
  }
};

export const getAuthURL = () => {
  return (dispatch) => {
    // Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
    const backendUrl = process.env.REACT_APP_ENV === 'dev' ? 'http://localhost:5050' : 'https://nowify-api.nickdigiulio.com';
    fetch(backendUrl + '/login')
      .then((data) => {
        return data.text()
      })
      .then((data) => {
        dispatch({type: SET_AUTH_URL, payload: data})
      }
    ).catch((err) => {
        console.log(err);
    })
  };
};

export default authReducer;
