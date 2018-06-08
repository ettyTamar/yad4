import React, { Component } from 'react';
import { View, StyleSheet,TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'
import {Dimensions} from 'react-native';

export default class MenuButton extends Component {
    render() {
        return (
            <View>
                <TouchableOpacity onPress={this.props.toggleDrawer} style={styles.icon}>
                <Icon
                size= {40}
                    name='menu' />
                </TouchableOpacity>
            </View>
        );
    }
}


const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    icon: {
        position: 'absolute',
        top: 20,
        left: DEVICE_WIDTH - 50,
        zIndex: 100

    }
})
