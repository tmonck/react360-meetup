// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import {ReactInstance, Surface} from 'react-360-web';
import BrowserInfoModule from './BrowserInfoNativeModule';
// import ModuleTest from './NativeModuleTest';

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

  // Load the initial environment
  r360.renderToSurface(
    r360.createRoot('SlideshowSample', {
      photos: [
        {uri: './static_assets/360_world.jpg', title: '360 World', format: '2D'},
        // Add your own 180 / 360 photos to this array,
        // with an associated title and format
        {
          uri: './static_assets/falcon_cockpit_v005_1500_.jpg',
          title: 'Kessel run in 12 parsecs',
          format: '3D',
          buttons: [
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
          ]
        },
        {
          uri: './static_assets/panorama12.jpg',
          title: 'Exploring Native Modules',
          format: '2D',
          buttons: [{
            displayName: 'BrowserNativeModule', showNativeModule: true
          }]
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
}

window.React360 = {init};
