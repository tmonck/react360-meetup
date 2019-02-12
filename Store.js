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
  showNativeModule: false
};

const listeners = new Set();

function updateComponents() {
  for (const cb of listeners.values()) {
    cb();
  }
}

export function setCurrent(value) {
    console.log('setting current snippet value');
    console.log(State.current);
    State.current = value;
    console.log(State.current);
    updateComponents();
}

export function setSnippets(snippets) {
    console.log('setting snippets');
    console.log(snippets);
    State.snippets = snippets;
    console.log(State.snippets);
    updateComponents();
}

export function setShowNativeModule(show) {
    console.log('setting showNativeModule');
    State.showNativeModule = show;
} 

export function connect(Component) {
  return class Wrapper extends React.Component {
    state = {
      snippets: State.snippets,
      current: State.current,
    };

    _listener = () => {
      this.setState({
        snippets: State.snippets,
        current: State.current,
      });
    };

    componentDidMount() {
      listeners.add(this._listener);
    }

    componentWillUnmount() {
      listeners.delete(this._listener);
    }

    render() {
      return (
        <Component
          {...this.props}
          snippets={this.state.snippets}
          current={this.state.current}
        />
      );
    }
  };
}