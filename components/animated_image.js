import React from 'react';
import {Animated, View} from 'react-360';
import Entity from 'Entity';
import AmbientLight from 'AmbientLight';
import PointLight from 'PointLight';
import {connect} from '../Store';

const AnimatedEntity = Animated.createAnimatedComponent(Entity);

class AnimatedImage extends React.Component {
    rotation = new Animated.Value(0);
    render() {
        console.log('Animated Image render')
        if (!this.props.animatedEntites || this.props.current < 0) {
            return null;
        }
        console.log('render animated image');
        if (!this.props.currentIsAnimatedEntity) {
            return null;
        } else {
            const post = this.props.animatedEntites[this.props.current];
            const source = post.source;
            console.log('trying to return an actual view');
            return (
            <View>
                <AmbientLight intensity={1.0} color={'#ffffff'} />
                <PointLight
                intensity={0.4}
                style={{transform: [{translate: [0, 4, -1]}]}}
                />
                <AnimatedEntity
                style={{transform: [{rotateY: this.rotation}]}}
                source={{gltf2: source.root.url}}
                />
            </View>
            );
        }
    }
}

const ConnectedAnimatedImage = connect(AnimatedImage);

export default ConnectedAnimatedImage;
