import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login/Login";
import Reservate from "./pages/Reservate/Reservate";
import Home from "./pages/Home/Home";
import Landing from "./pages/Landing/Landing";
import NotFound from "./pages/NotFound/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
    children: [ 
      {
        path: '/',
        element: <Landing />
      },
      {
        path: "search-rooms",
        element: <Reservate />,
      },
    ],
  },
  {
    path:'login',
    element: <Login />
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
