import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Wallpaper from '../Wallpaper';
import Logo from '../Logo';
import Menu from '../MenuButton';

export default class About extends Component {

  static navigationOptions = { drawerLabel: "About" };

  render() {
<<<<<<< HEAD
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
=======
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
          <Text style={styles.text}>
            Want to buy? contect us.
          </Text>

        </View>
      </Wallpaper>
    )
>>>>>>> 4a9018bac9177eac880bdccbaf6ad8d19c11a0e2
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
