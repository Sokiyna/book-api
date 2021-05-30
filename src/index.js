import React from "react";
import ReactDOM from "react-dom";
import App from "./app.js";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="dev-eg1hospq.eu.auth0.com"
    clientId="BIo9HIqmkg8EM3AWDe6vAPgsjCbJIQRm"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);