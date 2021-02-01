import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './rootReducer';


const persistConfig = {
  key: 'root',
  storage: storage,
}

// const middlewares = [thunk, logger];
const middlewares = [thunk];

// Using Redux Persist to persist State
const persistedReducer = persistReducer(persistConfig, rootReducer)
// Redux DevTools enable Trace
const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 50 })


// Export store and persistor
export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middlewares))
)
export const persistor = persistStore(store)
