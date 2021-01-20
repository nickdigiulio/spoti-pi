import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// routes config
import routes from "../routes";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// There is not a React hook equivalent of componentDidCatch()
// which is why Class component is being used instead of functional component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    this.dispatch = props.dispatch;
    this.history = props.history;
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidMount() {
    // This is needed to clear the state when history has been changed
    this.unlisten = this.props.history.listen((location, action) => {
      if (this.state.hasError) {
        this.setState({ hasError: false });
      }
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.log(error);
    console.log(errorInfo);
  }

  render() {

    if (this.state.hasError) {
      return (
        <>
          <h1 className="display-3">
            <span style={{ fontSize: "2.5rem", display: "flex", justifyContent: "center"}}>
              Oops! Something went wrong.
            </span>
          </h1>
          <p className="lead">
            <span style={{ color: "#3c4b64", display: "flex", justifyContent: "center" }}>
              Please log out and try again. If the problem persists, please
              contact us.
            </span>
          </p>
        </>
      );
    }

    return this.props.children;
  }
}

const Content = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const bgColor = useSelector((state) => state.background.background);
  return (
    <main className="wrapper" id="background" style={{ background: bgColor }}>
      <Suspense fallback={<h1>waiting</h1>}>
        <ErrorBoundary dispatch={dispatch} history={history}>
          <Switch>
            {routes.map((route, idx) => {
              return (
                route.component && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={(props) => (
                      <route.component {...props} />
                    )}
                  />
                )
              );
            })}
            <Redirect from="/" to="/connect" />
          </Switch>
        </ErrorBoundary>
      </Suspense>
    </main>
  );
};

export default React.memo(Content);
