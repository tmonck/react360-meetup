import {
  AppRegistry
} from 'react-360';
import Slideshow from './slideshow'
import CodeSnippetsList from './snippets';
import CodeSnippet from './snippet';
import ModuleTest from './NativeModuleTest';

AppRegistry.registerComponent('SlideshowSample', () => Slideshow);
AppRegistry.registerComponent('CodeSnippet', () => CodeSnippet);
AppRegistry.registerComponent('CodeSnippetsList', () => CodeSnippetsList);
AppRegistry.registerComponent('NativeModulesSample', () => ModuleTest);