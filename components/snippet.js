import React from 'react';
import {View, Image, asset, StyleSheet, Text} from 'react-360';
import {connect, setShowNativeModule} from '../Store';

class CodeSnippet extends React.Component {
    render() {
        console.log('CodeSnippet render');
        if (!this.props.snippets || this.props.current < 0) {
            return null;
        }

        const snippet = this.props.snippets[this.props.current];
        if (snippet.showNativeModule) {
            setShowNativeModule(true);
            return null;
        } else if (this.props.currentIsAnimatedEntity) {
            return null;
        }
        else {
            const source = snippet.uri;
            return (
            <View style={styles.wrapper}>
                <Image source={asset(source)} style={{height: 600, width: 600}}></Image>
            </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    wrapper: {
        width: 500,
        height: 500,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderColor: '#303050',
        borderWidth: 2,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
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

const ConnectedCodeSnippet = connect(CodeSnippet);

export default ConnectedCodeSnippet;