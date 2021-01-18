import { combineReducers } from 'redux';
import authReducer from './auth';
import trackInfoReducer from './trackInfo';

const appReducer = combineReducers({
  auth: authReducer,
  trackInfo: trackInfoReducer
})

export default appReducer
