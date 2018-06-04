import React, { Component } from 'react';
import { View, StyleSheet , Text} from 'react-native';
import { Constants } from 'expo';

export default class Home extends Component {


  render() {
    return (
      <View style={styles.container}>
      
        <Text> HOME </Text>
      
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});
