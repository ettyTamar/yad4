import React, { Component } from 'react';
import { View, StyleSheet, Text, Button, FlatList, RefreshControl } from 'react-native';
import { Icon } from 'react-native-elements'
import { Constants } from 'expo';
import Item from './ItemPrev';
import Menu from '../MenuButton';
import Wallpaper from '../Wallpaper';

import handler from '../Handler';
const Handler = new handler();
export default class Home extends Component {



  constructor(props) {
    super(props)
    this.state = {
      refreshing: false
    }
    this.Items = [];
  }


  static navigationOptions = {
    drawerLabel: 'Home'
  };


  getUpdate = () => {
    this.setState({refreshing: true})
    Handler.GetItems()
    .then((res)=>{
      this.Items = res;
      this.setState({refreshing: false})
    })
    .catch((err)=>{console.error(err)})
    
  
  }

  componentDidMount(){
    this.getUpdate();
  }

  render() {

    return (
      <Wallpaper>
      <View style={{direction: 'rtl'}}>
        <Menu navigation = {this.props.navigation}/>
        <FlatList
        style={{marginTop: 30}}
          data={this.Items}
          renderItem={({ item , index }) => <Item key={index} ItemData = {item}/>}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.getUpdate}
            />
          }
  
        />
      </View>
      </Wallpaper>
    );
  }
}
