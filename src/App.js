import React from "react";
import {
  HashRouter as Router,
  Route,
} from "react-router-dom";
import './scss/App.scss';
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/lib/integration/react";
import Layout from "./containers/Layout";

function App() {

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <React.Suspense>
            <Route path="/" name="Now Playing" render={(props) => <Layout {...props} />} />
          </React.Suspense>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
