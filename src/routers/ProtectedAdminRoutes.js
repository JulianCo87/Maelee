import React from "react";
import { Route, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
const cookies = new Cookies();

// receives component and any other props represented by ...rest
export default function ProtectedAdminRoutes({ component: Component, ...rest }) {

  return (
    // this route takes other routes assigned to it from the App.js and return the same route if condition is met
    <Route
      {...rest}
      render={(props) => {
        // get cookie from browser if logged in
        const token = cookies.get("TOKEN");
        var userRole;
        if (token) {
          const decoded = jwt_decode(token);
          userRole = decoded.userRole;
        }
        // returns route if there is a valid token set in the cookie
        if (userRole === 1) {
          return <Component {...props} />;
        } else {
          // returns the user to the landing page if there is no valid token set
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  // sets the location a user was about to access before being redirected to login
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
}