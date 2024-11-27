import { Spin } from "antd";
import { useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { LoadingContext } from "./context/useLoadingContext";
import Home from "./pages/Home/Home";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Verify from "./pages/Verify/Verify";
import TableRerservations from "./pages/TableReservations/TableRerservations";

import Reservate from "./pages/Reservate/Reservate";
import Register from "./pages/Register/Register";

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
      {
        path: "my-reservations",
        element: <TableRerservations />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "verify",
    element: <Verify />,
  },

  {
    path: "register",
    element: <Register />,
  }
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
