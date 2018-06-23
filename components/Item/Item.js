import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Button, Linking } from 'react-native';
import Wallpaper from '../Wallpaper';
import Menu from '../MenuButton';


export default class Item extends Component {




  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('data');

    return (
      <Wallpaper >

        <Menu navigation={this.props.navigation} />

        <View style={stlyes.container}>
          <Text>{item.CatagoryName}</Text>
          <Text>{item.ItemName}</Text>
          <Text>{item.ItemLocation}</Text>
          <Text>{item.ItemDscription}</Text>

          <Image
            style={{ width: 150, height: 150, borderRadius: 10 }}
            source={{ uri: 'http://via.placeholder.com/150x150' }} />
          <Text>{item.price}</Text>
          <Text>{item.UName_First}</Text>
          <Text>{item.UName_Last}</Text>
          <Button  title= {item.Phone} onPress={()=>{Linking.openURL(`tel:${item.Phone}`)}}/>
          <Button title = {item.Email} onPress={()=>{Linking.openURL(`mailto:${item.Email}`)}}/>
        </View>
      </Wallpaper>
    );
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const stlyes = StyleSheet.create({

  container: {
    borderRadius: 10,
    backgroundColor: '#edeff2',
    width: DEVICE_WIDTH - 20,
    height: DEVICE_HEIGHT - 50,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 50,
  }

})