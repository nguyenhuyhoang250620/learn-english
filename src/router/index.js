import { Route, Routes } from "react-router-dom";
import * as React from "react";
import PageLoader from "../components/PageLoader/index.js";
import PATH from "../constants/itemsContants";
const Timeout = 600;

const Event = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(
      () => resolve(import("../screen/pages/Event/Event.js")),
      Timeout
    );
  });
});
const SignIn = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("../screen/pages/Signin/SignIn")), Timeout);
  });
});

const Router = () => {
  return (
    <Routes>
      <Route
        path={PATH.EVENT}
        element={
          <React.Suspense fallback={<PageLoader />}>
            <Event />
          </React.Suspense>
        }
      />
      <Route
        path={PATH.SIGNIN}
        element={
          <React.Suspense fallback={<PageLoader />}>
            <SignIn />
          </React.Suspense>
        }
      />
    </Routes>
  );
};
export default Router;
