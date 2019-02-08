// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import {ReactInstance, Location, Surface} from 'react-360-web';

function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    ...options,
  });

  // Render your app content to the default cylinder surface
  // r360.renderToSurface(
  //   r360.createRoot('Hello360', { /* initial props */ }),
  //   r360.getDefaultSurface()
  // );
  
  // r360.renderToLocation(
  //   r360.createRoot('Chewy'),
  //   new Location([0, -2, -10]),
  // );
  const leftPanel = new Surface(300, 600, Surface.SurfaceShape.Flat);
  leftPanel.setAngle(-0.6, 0);
  const rightPanel = new Surface(300, 600, Surface.SurfaceShape.Flat);
  rightPanel.setAngle(0.6, 0);
  // Load the initial environment
  r360.renderToSurface(
    r360.createRoot('SlideshowSample', {
      photos: [
        {uri: './static_assets/360_world.jpg', title: '360 World', format: '2D'},
        // Add your own 180 / 360 photos to this array,
        // with an associated title and format
        {uri: './static_assets/falcon_cockpit_v005_1500_.jpg', title: 'Kessel run in 12 parsecs', format: '3D', buttons: ['yes', 'no']}
      ],
    }),
    leftPanel,
  );
}

window.React360 = {init};
