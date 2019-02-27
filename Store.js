import * as React from 'react';

/**
 * If you want to share data between multiple root components, you'll need a
 * global store like Redux. This is similar to building a web app where you
 * want to synchronize data between a sidebar and a main view - just extended
 * into three dimensions.
 * To simplify this sample, we implement a trivial Redux-like store that will
 * ensure all of our elements are synchronized.
 */
const State = {
  snippets: undefined,
  current: -1,
  showNativeModule: false,
  animatedEntites: undefined,
  showAnimatedEntites: false,
  currentIsAnimatedEntity: false
};
const POLY_PATH = 'https://poly.googleapis.com/v1/assets?';
export function initialize(apiKey) {
  // Fetch the top 5 posts from Google Poly
  const options = {
    curated: true,
    format: 'GLTF2',
    key: apiKey,
    pageSize: 5,
  };
  
  const queryString = Object.keys(options)
    .map(k => `${k}=${options[k]}`)
    .join('&');
  fetch(POLY_PATH + queryString)
    .then(response => response.json())
    .then(body => {
      const entries = body.assets.map(asset => {
        const objSource = asset.formats.filter(
          format => format.formatType === 'GLTF2'
        )[0];
        return {
          id: asset.name,
          name: asset.displayName,
          author: asset.authorName,
          description: asset.description,
          source: objSource,
          preview: asset.thumbnail.url,
        };
      });
      
      State.animatedEntites = entries;
      console.log('fetch returned')
      updateComponents();
    });
  }
const listeners = new Set();

function updateComponents() {
  for (const cb of listeners.values()) {
    cb();
  }
}

export function setCurrent(value, isAnimatedEntity=false) {
  console.log('set current');
  console.log(value);
  console.log(isAnimatedEntity);
    State.current = value;
    State.currentIsAnimatedEntity = isAnimatedEntity;
    updateComponents();
}

export function setShowAnimtatedEntites(value) {
  console.log('setting show animated entities');
  console.log(value);
  State.showAnimatedEntites = value;
  updateComponents();
}

export function setSnippets(snippets) {
    State.snippets = snippets;
    updateComponents();
}

export function setShowNativeModule(show) {
    State.showNativeModule = show;
} 


export function connect(Component) {
  return class Wrapper extends React.Component {
    state = {
      snippets: State.snippets,
      current: State.current,
      showAnimatedEntites: State.showAnimatedEntites,
      animatedEntites: State.animatedEntites,
      currentIsAnimatedEntity: State.currentIsAnimatedEntity
    };

    _listener = () => {
      this.setState({
        snippets: State.snippets,
        current: State.current,
        showAnimatedEntites: State.showAnimatedEntites,
        animatedEntites: State.animatedEntites,
        currentIsAnimatedEntity: State.currentIsAnimatedEntity
      });
    };

    componentDidMount() {
      listeners.add(this._listener);
    }

    componentWillUnmount() {
      listeners.delete(this._listener);
    }
    componentDidUpdate() {
      console.log('ive updated');
      console.log(this.state.currentIsAnimatedEntity);
    }

    render() {
      return (
        <Component
          {...this.props}
          snippets={this.state.snippets}
          current={this.state.current}
          showAnimatedEntites={this.state.showAnimatedEntites}
          animatedEntites={this.state.animatedEntites}
          currentIsAnimatedEntity={this.state.currentIsAnimatedEntity}
        />
      );
    }
  };
}