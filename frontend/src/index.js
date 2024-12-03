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
import {EventProvider} from "./providers/event.provider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <EventProvider>
          <AuthProvider>
              <RouterProvider router={router} />
          </AuthProvider>
      </EventProvider>
  </React.StrictMode>
);