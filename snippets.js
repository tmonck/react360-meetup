import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  VrButton,
} from 'react-360';
import {connect, setCurrent} from './Store';

const CodeSnippetsList = props => {
      if (!props.snippets) {
          console.log('we have no snippets')
          return <View style={styles.wrapper}>
          <Text>No Snippets for current slide</Text>
          </View>
      }
      const snippets = props.snippets.map((snippet,i) => {
        return <View style={styles.extraButtons}>
            <VrButton style={styles.button} onClick={() => setCurrent(i)}>
                <Text>{snippet.displayName}</Text>
            </VrButton>
        </View>
    })
    return (
        <View style={styles.wrapper}>{snippets}</View>
    );
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
    borderRadius: 5,
    width: 40,
    height: 44,
  },
  extraButtons: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: 150,
      padding: 10,
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