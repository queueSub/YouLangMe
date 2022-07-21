import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";


export default function PublicRoute({
  component: Component,
  restricted,
  ...rest
}) {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn && restricted ? (
          <Redirect to="/main" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}