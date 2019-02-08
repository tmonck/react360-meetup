import React from 'react';
import {View, Image, asset} from 'react-360';

class Chewy extends React.Component {
    render() {
        return (
            <View>
                <Image source={asset('Chewie_Sq.jpg')} />
            </View>
        )
    }
}

export default Chewy