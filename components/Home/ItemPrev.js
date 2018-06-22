import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import {Dimensions} from 'react-native';
import {withNavigation} from 'react-navigation';




class Item extends Component {

    render() {
        return (

            <View  style={{marginTop: 20 , direction: "rtl"}}>
            <TouchableOpacity onPress={ ()=>{ this.props.navigation.navigate('Item' , {data : this.props.ItemData})}}>
                    <View style={styles.container}>
                        
                        <Image
                            style={{ width: 150, height: 150, borderRadius: 10 }}
                            source={{ uri: 'http://via.placeholder.com/150x150' }} />
                        <Text style= {styles.location}>מיקום: {this.props.ItemData.ItemLocation}</Text>
                        <Text style={styles.title}>{this.props.ItemData.CatagoryName }, {this.props.ItemData.ItemName}</Text>
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
export default withNavigation(Item);

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    title: {
        position: 'absolute',
        paddingRight: 20,
        right: 0,
        top: 30,
    },
    container: {
        borderRadius: 10,
        width: DEVICE_WIDTH - 20,
        marginLeft: 5,
        backgroundColor: '#edeff2'
    },
    location:{
        
            position: 'absolute',
            paddingRight: 20,
            right: 0,
            top: 0,
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            width: 242
        
    },
    price:{
        position: 'absolute',
        left: 150,
        bottom: 10
    },
    description:{
        position: 'absolute',
        left: 150,
        top: 50,
        width: 220,
        height: 100,
    
    }
})


