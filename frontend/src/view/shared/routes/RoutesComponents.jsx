import React from "react";
import { Route, Switch } from "react-router-dom";
import routes from "../../../routes";
import CustomLoadable from "../CustomLoadable";
import PrivateRoutes from "./PrivateRoutes";
function RoutesComponents(props) {
  return (
    <Switch>
      {routes.privateRoutes.map((route) => (
        <PrivateRoutes
          exact
          key={route.path}
          path={route.path}
          currentUser={null}
          component={CustomLoadable({ loader: route.loader })}
        />
      ))}
    </Switch>
  );
}

export default RoutesComponents;
