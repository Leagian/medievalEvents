import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Modal from "react-modal";
import App from "./App";
import { DataContextProvider } from "./contexts/DataContext";
import { CurrentUserContextProvider } from "./contexts/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
Modal.setAppElement("#root");

root.render(
  <React.StrictMode>
    <CurrentUserContextProvider>
      <DataContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DataContextProvider>
    </CurrentUserContextProvider>
  </React.StrictMode>
);
