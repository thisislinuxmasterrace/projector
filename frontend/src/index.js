import React from 'react';
import ReactDOM from 'react-dom/client';

import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';

import './index.css';

import {
    RouterProvider,
} from "react-router-dom";

import router from "./router";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);