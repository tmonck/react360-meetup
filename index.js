import {
  AppRegistry
} from 'react-360';
import Slideshow from './components/slideshow'
import CodeSnippetsList from './components/snippets';
import CodeSnippet from './components/snippet';
import ModuleTest from './components/nativemodule';
import AnimatedImage from './components/animated_image'
import * as Store from './Store';
Store.initialize('');

AppRegistry.registerComponent('SlideshowSample', () => Slideshow);
AppRegistry.registerComponent('CodeSnippet', () => CodeSnippet);
AppRegistry.registerComponent('CodeSnippetsList', () => CodeSnippetsList);
AppRegistry.registerComponent('NativeModulesSample', () => ModuleTest);
AppRegistry.registerComponent('AnimatedImage', () => AnimatedImage);