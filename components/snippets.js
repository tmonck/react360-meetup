import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  VrButton,
} from 'react-360';
import {connect, setCurrent, setShowNativeModule} from '../Store';

const CodeSnippetsList = props => {
    console.log('loading code snippetslist')
    console.log(JSON.stringify(props));
    console.log(props.animatedEntites);
    console.log(props.showAnimatedEntites);
    if (props.showAnimatedEntites) {
        console.log('i should show animated entities list');
        if (!props.animatedEntites) {
            return (
              <View style={styles.extraButtons}>
                <Text>Loading...</Text>
              </View>
            );
          }
        const entities = props.animatedEntites.map((entity,i) => {
        return <View style={styles.extraButtons}>
            <VrButton style={styles.button} onClick={() => {
                setCurrent(i, true);
                }}>
                <Text style={styles.buttonText}>{entity.name}</Text>
            </VrButton>
        </View>
        })
        return (
            <View style={styles.wrapper}>{entities}</View>
        );
    } else if (!props.snippets) {
        return <View style={styles.wrapper}>
        <Text>No Snippets for current slide</Text>
        </View>
    } else {
        console.log('adding snippet list');
        console.log(props.showAnimatedEntities);
        const snippets = props.snippets.map((snippet,i) => {
        return <View style={styles.extraButtons}>
            <VrButton style={styles.button} onClick={() => {
                setCurrent(i);
                if (snippet.showNativeModule){
                    setShowNativeModule(true);
                } else {
                    setShowNativeModule(false);
                    }
                    }}>
                <Text style={styles.buttonText}>{snippet.displayName}</Text>
            </VrButton>
        </View>
        })
        
        return (
            <View style={styles.wrapper}>{snippets}</View>
        );
    }
};

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
  panel: {
    // Fill the entire surface
    width: 1000,
    height: 600,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#c0c0d0',
    borderRadius: 5
  },
  buttonText: {
    textAlign: 'center',
    color: '#000000',
    fontSize: 30,
    fontWeight: 'bold',
  },
  extraButtons: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: 290,
      padding: 5,
  },
  greetingBox: {
    padding: 20,
    backgroundColor: '#000000',
    borderColor: '#639dda',
    borderWidth: 2,
  },
  greeting: {
    fontSize: 30,
  },
});

const ConnectedCodeSnippetsList = connect(CodeSnippetsList);
export default ConnectedCodeSnippetsList;