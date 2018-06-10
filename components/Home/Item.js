import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import {Dimensions} from 'react-native';

export default class Item extends Component {
    render() {
        return (

            <View  style={{marginBottom: 10 , direction: "rtl"}}>
            <Text style={{marginRight: 50}}>{this.props.ItemData.CatagoryName } : {this.props.ItemData.ItemName}</Text>
                <TouchableOpacity>
                    <View style={styles.container}>
                        
                        <Image
                            style={{ width: 150, height: 150 }}
                            source={{ uri: 'http://via.placeholder.com/150x150' }} />
                        <Text style= {styles.location}>מיקום: {this.props.ItemData.ItemLocation}</Text>
                        <View style= {styles.description}> 
                            <Text numberOfLines= {6} ellipsizeMode='tail'>
                                {this.props.ItemData.ItemDscription}
                            </Text>
                        </View>
                        <Text style={styles.price}>{this.props.ItemData.price} &#8362;</Text>
                    </View>
                </TouchableOpacity>
            </View>

        );
    }
}


const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        borderColor: 'black',
        borderWidth: 3,
        width: DEVICE_WIDTH - 20,
        marginLeft: 10,
    },
    location:{
        
            position: 'absolute',
            right: 20,
            top: 0
        
    },
    price:{
        position: 'absolute',
        left: 150,
        bottom: 10
    },
    description:{
        flex: 1,
        position: 'absolute',
        left: 150,
        top: 40,
        width: 230,
        height: 100,
    
    }
})