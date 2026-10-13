import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { installAdsClickTracking } from "./lib/googleAdsConversions";
import "./styles/about.css";
import "bootstrap/dist/css/bootstrap.min.css";

const rootElement = document.getElementById("root");
const stopAdsClickTracking = installAdsClickTracking(rootElement);

if (import.meta.hot) {
  import.meta.hot.dispose(stopAdsClickTracking);
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
