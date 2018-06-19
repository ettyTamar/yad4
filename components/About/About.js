import React, { Component } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import Wallpaper from '../Wallpaper';


export default class About extends Component {

  static navigationOptions = { drawerLabel: "About" };

  render() {
    return(
    <Wallpaper>
      <View style={styles.container}>
        <Text style={styles.text}>
          we are students at ruppin.
          we build this app to make our friends an
          easier way to purchase cool things one from a nother.
          When were not at ruppin, you can find us in our mail:
          etty.ohayon@gmail.com
          orhaybenaim@gmail.com
          Want to buy? contect us.
        </Text>
      </View>
    </Wallpaper>
    );
  }
}

styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  text:{
    color: 'white'
  }

})
