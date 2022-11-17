import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Dashboard from './Dashboard';
import Billboard from './experiments/Billboard';

// arc carousel
// pink floyd prism
// fantasy portal
// iss in orbit
// racetrack
// mouse trails
// pixel rivers
// friction text
// gooey noise
// greenscreen
// water ripples
// glass refraction
// wavy gradients
// marquee hover menu

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />
  },
  {
    path: "/billboard",
    element: <Billboard />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />
)
;
