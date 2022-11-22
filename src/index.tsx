import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Dashboard from './Dashboard';
import Billboard from './experiments/Billboard';
import GlassRefraction from './experiments/GlassRefraction'
import WaterRipples from './experiments/WaterRipples';
import RacetrackScene from './experiments/Racetrack';
import CarShow from './experiments/CarShow';

// arc carousel
// car show
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
  },
  {
    path: "/car-show",
    element: <CarShow />
  },
  {
    path: "/refraction",
    element: <GlassRefraction />
  },
  {
    path: "/racetrack",
    element: <RacetrackScene />
  },
  {
    path: "/ripples",
    element: <WaterRipples />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />
)
;
