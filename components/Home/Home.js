import React, { Component } from 'react';
import { View, StyleSheet, Text, Button, FlatList } from 'react-native';
import { Icon } from 'react-native-elements'
import { Constants } from 'expo';
import Item from './Item';
import Menu from '../MenuButton';
import { withNavigation } from 'react-navigation';


export default class Home extends Component {



  constructor(props) {
    super(props)
  }


  static navigationOptions = {
    drawerLabel: 'Home',
  };


  render() {
    // const user = JSON.parse(this.props.navigation.state.params.user);

    return (

      <View >
        <Menu toggleDrawer={this.props.navigation.toggleDrawer} />
        <FlatList
        style={{marginTop: 30}}
          data={[<Item />, <Item />, <Item /> , <Item /> ,<Item />, <Item /> , <Item /> ,<Item />]}
          renderItem={({ item }) => item}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  icon: {
    position: 'absolute',
    top: 50,
    right: 0
  },

});
