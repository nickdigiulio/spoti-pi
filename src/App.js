import logo from './logo.svg';
import React from "react";
import {
  HashRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import './App.css';
import { Provider, useSelector } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/lib/integration/react";
import Layout from "./containers/Layout";

// Containers
// const Layout = React.lazy(() => import("./containers/Layout"));

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
