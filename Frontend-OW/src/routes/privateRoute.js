import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ connectedUser, Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      connectedUser.name ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);

export default PrivateRoute;
