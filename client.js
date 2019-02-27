// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import {ReactInstance, Location, Surface} from 'react-360-web';
import BrowserInfoModule from './modules/BrowserInfoNativeModule';

function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    nativeModules: [
      ctx => new BrowserInfoModule(ctx),
    ],
    ...options,
  });

  const leftPanel = new Surface(300, 600, Surface.SurfaceShape.Flat);
  leftPanel.setAngle(-0.6, 0);
  
  const rightPanel = new Surface(300, 600, Surface.SurfaceShape.Flat);
  rightPanel.setAngle(0.6, 0);

  const centerPanel = new Surface(600, 600, Surface.SurfaceShape.Cylinder);

  const rearPanel = new Surface(720,600, Surface.SurfaceShape.Flat);
  rearPanel.setAngle(Math.PI / 2, 0);

  const location = new Location([0, -2, -10]);
  // Load the initial environment
  r360.renderToSurface(
    r360.createRoot('SlideshowSample', {
      photos: [
        {
          uri: './static_assets/360_world.jpg',
          title: '360 World',
          format: '3D',
          showAnimatedEntities: true
        },
        // Add your own 180 / 360 photos to this array,
        // with an associated title and format
        {
          uri: './static_assets/falcon_cockpit_v005_1500_.jpg',
          title: 'Kessel run in 12 parsecs',
          format: '3D',
          snippets: [
            {
              displayName: 'Index.js',
              uri: './index_js.jpg'
            },
            {
              displayName: 'React Instance and Surfaces',
              uri: './client_js_1.jpg'
            },
            {
              displayName: 'Render surfaces',
              uri: './client_js_2.jpg'
            }
          ],
          showAnimatedEntities: false
        },
        {
          uri: './static_assets/panorama12.jpg',
          title: 'Exploring Native Modules',
          format: '2D',
          snippets: [{
            displayName: 'BrowserNativeModule', showNativeModule: true
          }],
          showAnimatedEntities: false
        }
      ],
    }),
    leftPanel,
  );

  r360.renderToSurface(
    r360.createRoot('CodeSnippetsList'),
    rightPanel,
  )
  
  r360.renderToSurface(
    r360.createRoot('CodeSnippet'),
    centerPanel,
  )
  r360.renderToSurface(
    r360.createRoot('NativeModulesSample', {}),
    centerPanel,
  );
  r360.renderToLocation(
    r360.createRoot('AnimatedImage'),
    location,
  );
}

window.React360 = {init};
