import { Spin } from "antd";
import { useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { LoadingContext } from "./context/useLoadingContext";
import Home from "./pages/Home/Home";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Reservate from "./pages/Reservate/Reservate";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "search-rooms",
        element: <Reservate />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
]);
export const App = () => {
  const { loading } = useContext(LoadingContext);

  return (
    <>
      <Spin
        fullscreen={true}
        spinning={loading}
        size="large"
        tip="Cargando..."
      />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
};
