import { Navigate, Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./utils/routes";
import { routePathName } from "./utils/constants";
import { useAppSelector } from "./redux/reduxHooks";
import { Suspense } from "react";

const PublicRoutes = () => {
  return (
    <Routes>
      {publicRoutes.map((route, index) => {
        return (
          <Route key={index} path={route?.path} Component={route?.element} />
        );
      })}
      <Route path="*" element={<Navigate to={routePathName.home} />} />
    </Routes>
  );
};

const PrivateRoutes = () => {
  return (
    <Routes>
      {privateRoutes.map((route, index) => (
        <Route key={index} path={route?.path} Component={route?.element} />
      ))}
      <Route path="*" element={<Navigate to={routePathName.privateRoute} />} />
    </Routes>
  );
};

function App() {
  const { isLogin } = useAppSelector((state) => state.auth);

  return (
    <Suspense fallback={<>Loading...</>}>
      {!isLogin ? <PublicRoutes /> : <PrivateRoutes />}
    </Suspense>
  );
}

export default App;

