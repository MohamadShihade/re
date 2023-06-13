import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import Layout from "../../../Layout/Layout";
function PrivateRoutes({ component: Component, ...rest }) {
  const location = useLocation();

  return (
    <Route
      render={(props) => {
        return (
          <div style={{ minHeight: "100%" }}>
            <Layout {...props}>
              <Component {...props} />
            </Layout>
          </div>
        );
      }}></Route>
  );
}

export default PrivateRoutes;
