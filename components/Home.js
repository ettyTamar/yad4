import React, { Component } from 'react';
import { View, StyleSheet , Text} from 'react-native';
import { Constants } from 'expo';
import Login from './Login/Login';

export default class Home extends Component {

  render() {
    const user = JSON.parse(this.props.navigation.state.params.user);

    return (
      <View style={styles.container}>
      
      <Text> Name: {user.UName_First}</Text>
      <Text> Last name: {user.UName_Last}</Text>
      <Text> Email: {user.Email}</Text>

      
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
