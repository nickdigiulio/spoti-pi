import { combineReducers } from 'redux';
import authReducer from './auth';
import trackInfoReducer from './trackInfo';
import backgroundReducer from './background';

const appReducer = combineReducers({
  auth: authReducer,
  trackInfo: trackInfoReducer,
  background: backgroundReducer
})

export default appReducer
