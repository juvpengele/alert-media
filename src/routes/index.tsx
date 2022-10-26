import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Main from "../components/layout/Main";
import { ReactElement } from "react";
import { AuthLayout } from "../components/layout/Auth";
import { Login } from "../pages/Login";
import { Sector } from "../pages/configurations/Sector";
import { Zone } from "../pages/configurations/Zone";
import { Theme } from "../pages/configurations/Theme";
import Alert from "../pages/Alerts";
import { CreateAlert } from '../pages/Alerts/CreateAlert';
import { PrivateRoute } from "./PrivateRoute";

interface RouteElement {
  path: string;
  element: ReactElement;
}

const authRoutes: RouteElement[] = [
  { path: "/auth/login", element: <Login /> },
];
const dashboardRoutes: RouteElement[] = [
  { path: "/", element: <Home /> },
  { path: "/alertes", element: <Alert /> },
  { path: "/alertes/create", element: <CreateAlert />},
  { path: "/configurations/secteurs", element: <Sector />},
  { path: "/configurations/zones", element: <Zone />},
  { path: "/configurations/themes", element: <Theme />}
];

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {authRoutes.map(({ path, element }: RouteElement) => (
          <Route path={path} element={<AuthLayout>{element}</AuthLayout>} />
        ))}
        {dashboardRoutes.map(({ path, element }: RouteElement) => (
          <Route path={path} element={
            <PrivateRoute>
              <Main>{element}</Main>
            </PrivateRoute>} />
        ))}
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
