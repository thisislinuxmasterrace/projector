import React from 'react';
import ReactDOM from 'react-dom/client';

import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';

import './index.css';

import {
    RouterProvider,
} from "react-router-dom";

import router from "./router";
import {AuthProvider} from "./providers/auth.provider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <AuthProvider>
          <RouterProvider router={router} />
      </AuthProvider>
  </React.StrictMode>
);