import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "jquery/dist/jquery";
import "popper.js/dist/popper";
import "bootstrap/dist/js/bootstrap";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store/store";

const preloadedState = store.getState();

store.subscribe((preloadedState) => {
  console.log(store.getState());
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
