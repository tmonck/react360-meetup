import React from 'react';
import {
    Environment,
    StyleSheet,
    Text,
    View,
    VrButton,
} from 'react-360';
import { setSnippets, setCurrent } from './Store';

class Background extends React.Component {
    constructor(props) {
      super();
      Environment.setBackgroundImage(props.uri, {format: props.format});
    }
  
    componentWillReceiveProps(nextProps) {
      if (
        nextProps.uri !== this.props.uri ||
        nextProps.format !== this.props.format
      ) {
        Environment.setBackgroundImage(nextProps.uri, {format: nextProps.format});
      }
    }
  
    render() {
      return null;
    }
  }

export default class Slideshow extends React.Component {
    state = {
      index: 0,
    };
  
    componentDidMount() {
      setSnippets(this.props.photos[0].buttons);
      setCurrent(-1);
    }
    _prevPhoto = () => {
      let next = this.state.index - 1;
      if (next < 0) {
        next += this.props.photos.length;
      }
      this.setState({
        index: next,
      });
      setSnippets(this.props.photos[next % this.props.photos.length].buttons);
      setCurrent(-1);
    };
  
    _nextPhoto = () => {
      this.setState({
        index: this.state.index + 1,
      });
      setSnippets(this.props.photos[(this.state.index + 1) % this.props.photos.length].buttons);
      setCurrent(-1);
    };
  
    render() {
      const current = this.props.photos[
        this.state.index % this.props.photos.length
      ];
      
        // if (current.buttons) {
        //     console.log('we got extra buttons')
        //     extraButtons = current.buttons.map(button => {
        //         return <View style={styles.extraButtons}>
        //             <VrButton style={styles.button}>
        //                 <Text style={styles.buttonText}>{button.displayName}</Text>
        //             </VrButton>
        //         </View>
        //     })
        // } else {
        //     extraButtons = <View/>
        // }
      return (
        <View style={styles.wrapper}>
          <Background uri={current.uri} format={current.format} />
          <View style={styles.controls}>
            <VrButton onClick={this._prevPhoto} style={styles.button}>
              <Text style={styles.buttonText}>{'<'}</Text>
            </VrButton>
            <View>
              <Text style={styles.title}>{current.title}</Text>
            </View>
            <VrButton onClick={this._nextPhoto} style={styles.button}>
              <Text style={styles.buttonText}>{'>'}</Text>
            </VrButton>
          </View>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    wrapper: {
        width: 300,
        height: 600,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderColor: '#303050',
        borderWidth: 2,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
      },
    controls: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: 200,
      padding: 10,
    },
    extraButtons: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 150,
        padding: 10,
    },
    title: {
      color: '#ffffff',
      textAlign: 'left',
      fontSize: 36,
      fontWeight: 'bold',
    },
    button: {
      backgroundColor: '#c0c0d0',
      borderRadius: 5,
      width: 40,
      height: 44,
    },
    buttonText: {
      textAlign: 'center',
      color: '#000000',
      fontSize: 30,
      fontWeight: 'bold',
    },
  });