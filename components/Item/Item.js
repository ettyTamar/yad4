import React, { Component } from 'react';
import {  View ,Text } from 'react-native';
import Wallpaper from '../Wallpaper';
import Menu from '../MenuButton';

export default class Item extends Component {

    


  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('data');
    
    return (
        <Wallpaper>
        <View >
          <Menu navigation = {this.props.navigation}/>
            <Text>{item.CatagoryName}</Text>
            <Text>{item.ItemName}</Text>
            <Text>{item.ItemLocation}</Text>
            <Text>{item.ItemDscription}</Text>
            <Text>{item.ItemImg}</Text>
            <Text>{item.price}</Text>
            <Text>{item.UName_First}</Text>
            <Text>{item.UName_Last}</Text>
            <Text>{item.Phone}</Text>
            <Text>{item.Email}</Text>
        </View>
        </Wallpaper>
    );
  }
}
