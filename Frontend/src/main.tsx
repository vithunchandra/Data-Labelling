import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.min.css";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { CookiesProvider } from "react-cookie";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <CookiesProvider defaultSetOptions={{path: '/'}}>
      <App />
    </CookiesProvider>
  </Provider>
);
