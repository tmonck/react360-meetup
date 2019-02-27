import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    VrButton,
} from 'react-360';
import Background from '../components/background'
import { setSnippets, setCurrent, setShowAnimtatedEntites } from '../Store';

export default class Slideshow extends React.Component {
    state = {
      index: 0,
    };
  
    componentDidMount() {
      console.log('i did mount')
      setSnippets(this.props.photos[this.state.index].snippets);
      setCurrent(-1);
      console.log(this.props.photos[this.state.index].showAnimatedEntities);
      setShowAnimtatedEntites(this.props.photos[this.state.index].showAnimatedEntities)
    }
    _prevPhoto = () => {
      let next = this.state.index - 1;
      if (next < 0) {
        next += this.props.photos.length;
      }
      this.setState({
        index: next,
      });
      console.log(next);
      setSnippets(this.props.photos[next % this.props.photos.length].snippets);
      setCurrent(-1);
      console.log(this.props.photos[next % this.props.photos.length].showAnimatedEntities);
      setShowAnimtatedEntites(this.props.photos[next % this.props.photos.length].showAnimatedEntities)
      console.log(this.props.animatedEntites);
    };
  
    _nextPhoto = () => {
      let next = this.state.index + 1;
      if (next === this.props.photos.length) {
      next = 0;
    }
    this.setState({
      index: next,
    });
      setSnippets(this.props.photos[next % this.props.photos.length].snippets);
      setCurrent(-1);
      console.log(this.props.photos[next % this.props.photos.length].showAnimatedEntities);
      setShowAnimtatedEntites(this.props.photos[next % this.props.photos.length].showAnimatedEntities)
    };
  
    render() {
      const current = this.props.photos[
        this.state.index % this.props.photos.length
      ];
      
      return (
        <View style={styles.wrapper}>
          <Background uri={current.uri} format={current.format} />
          <View style={styles.controls}>
            <VrButton id='previousPhoto' onClick={this._prevPhoto} style={styles.button}>
              <Text style={styles.buttonText}>{'<'}</Text>
            </VrButton>
            <View>
              <Text style={styles.title}>{current.title}</Text>
            </View>
            <VrButton id='nextPhoto' onClick={this._nextPhoto} style={styles.button}>
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
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: 290,
      padding: 5,
    },
    title: {
      color: '#ffffff',
      textAlign: 'left',
      fontSize: 20,
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