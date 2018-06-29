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
      isReady: false
    }
    this.Items = [];
    this.images = [];
  }


  static navigationOptions = {
    drawerLabel: 'Home'
  };


  getUpdate = () => {
    this.setState({refreshing: true})
    Handler.GetItems()
    .then((res)=>{
      this.Items = res.length > 0 ? res : [{ItemDscription: 'No Items'}]
      this.images = this.Items.map(item=>item.ItemImg);
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
  renderItem = ({ item , index }) => <Item key={index} ItemData = {item}/>;
  render() {
   

    return (
      <Wallpaper>
        <Menu navigation = {this.props.navigation}/>
       <View style={{direction: 'rtl'}}>
        
        <FlatList
        style={{marginTop: 30}}
          data={this.Items}
          keyExtractor={this._keyExtractor}
          getItemLayout={(data, index) => (
            {length: 150, offset: 150 * index, index}
          )}
          renderItem={this.renderItem}
          initialNumToRender={5}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.getUpdate}
            />
          }
  
        />
      </View>
      <Button title="LOG OUT" onPress={()=>{AsyncStorage.removeItem("@yad4:user"), ()=> {this.props.navigation.navigation("Login")}}}/>
      </Wallpaper>
    );
  }
}
