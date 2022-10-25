import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Main from "../components/layout/Main";
import { ReactElement } from "react";
import { AuthLayout } from "../components/layout/Auth";
import { Login } from "../pages/Login";

interface RouteElement {
  path: string;
  element: ReactElement;
}

const authRoutes: RouteElement[] = [
  { path: "/auth/login", element: <Login /> },
];
const dashboardRoutes: RouteElement[] = [
  { path: "/dashboard", element: <Home /> },
];

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {authRoutes.map(({ path, element }: RouteElement) => (
          <Route path={path} element={<AuthLayout>{element}</AuthLayout>} />
        ))}
        {dashboardRoutes.map(({ path, element }: RouteElement) => (
          <Route path={path} element={<Main>{element}</Main>} />
        ))}
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
