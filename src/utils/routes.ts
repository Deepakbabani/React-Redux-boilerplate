import { lazy } from "react";
import { routePathName } from "./constants";

const HomePage = lazy(() => import("../views/Home/HomePage"));
const PrivateRoute = lazy(() => import("../views/PrivateRoute"));

export const publicRoutes = [{ path: routePathName.home, element: HomePage }];
export const privateRoutes = [
  { path: routePathName.privateRoute, element: PrivateRoute },
];
