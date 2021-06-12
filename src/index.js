import React from "react";
import { render } from "react-dom";
import App from "./components/App";
import * as stores from "@stores/implementation";
import { Provider } from "mobx-react";
import "@styles";

let root = document.createElement("div");

root.id = "root";
document.body.appendChild(root);

render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById("root")
);
