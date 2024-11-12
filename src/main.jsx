import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import { LoadingProvider } from "./context/useLoadingContext.jsx";
import { ReservationProvider } from "./context/useReservationContext.jsx";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoadingProvider>
      <ReservationProvider>
        <App />
      </ReservationProvider>
    </LoadingProvider>
  </StrictMode>
);
