export const SET_BACKGROUND_COLOR = "SET_BACKGROUND_COLOR";
export const SET_FRAME_SIZE = "SET_FRAME_SIZE";

const initState = {
  background: '#c074b2',
  windowSize: {}
}

const backgroundReducer = (state = initState, action) => {
  switch(action.type){
    case SET_BACKGROUND_COLOR:
      return {
        ...state,
        background: action.payload.background,
        image: action.payload.image
      }

    case SET_FRAME_SIZE:
      return {
        ...state,
        windowSize: action.payload
      }

    default:
      return state
  }
};

export default backgroundReducer;
