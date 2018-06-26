import React, { Component } from 'react';
import { View, StyleSheet, Text, Button, FlatList, RefreshControl, AsyncStorage } from 'react-native';
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
      refreshing: false,
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
      this.Items = res.length > 0 ? res : [{ItemDscription: 'No Items'}]
      
      this.setState({refreshing: false})
    })
    .catch((err)=>{console.error(err)})
    
  
  }

  async componentDidMount(){
    this.getUpdate();
    
    // try {
    //   const value = await AsyncStorage.getItem('@yad4:user');
    //   if (value !== null){
    //     console.log(value);
        
    //   }
    // } catch (error) {
    //   // Error retrieving data
    // }
  }

  _keyExtractor = (item, index) => index.toString();

  render() {

    return (
      <Wallpaper>
        <Menu navigation = {this.props.navigation}/>
        <Button title="LOG OUT" onPress={()=>{AsyncStorage.removeItem("@yad4:user"), ()=> {this.props.navigation.navigation("Login")}}}/>
      <View style={{direction: 'rtl'}}>
        
        <FlatList
        style={{marginTop: 30}}
          data={this.Items}
          keyExtractor={this._keyExtractor}
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
