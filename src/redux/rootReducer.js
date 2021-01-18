import { combineReducers } from 'redux';
import authReducer from './auth';
import playbackStatusReducer from './playbackStatus';
import trackInfoReducer from './trackInfo';

const appReducer = combineReducers({
  auth: authReducer,
  playbackStatus: playbackStatusReducer,
  trackInfo: trackInfoReducer
})

export default appReducer
