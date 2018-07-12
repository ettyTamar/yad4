import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Wallpaper from '../Wallpaper';
import Logo from '../Logo';
import Menu from '../MenuButton';

export default class About extends Component {

  static navigationOptions = { drawerLabel: "About" };

  render() {
    return (
      <Wallpaper>
      <Menu navigation = {this.props.navigation}/>
        <Logo />
        <View style={styles.container}>
          <Text style={styles.text}>
            etty.ohayon@gmail.com
        </Text>
          <Text style={styles.text}>
            orhaybenaim@gmail.com
          </Text>
 

        </View>
      </Wallpaper>
    )
  }
}

styles = StyleSheet.create({
  container: {
    flex: 4,
    alignItems: 'center',
  },
  text: {
    color: 'white'
  }

})
