import React, { Component } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import Item from './ItemPrev';
import Menu from '../MenuButton';
import Wallpaper from '../Wallpaper';
import Handler from '../Handler';
import {Notifications} from 'expo';
export default class Home extends Component {



  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      isReady: false
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
   
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
 

  }


  _handleNotification = (notification) => {
    this.props.navigation.navigate('Item' , {data : notification.data})
    console.log(notification.data);
    
  };




  _keyExtractor = (item, index) => index.toString();
  renderItem = ({ item , index }) => <Item key={index} index={index} ItemData = {item}/>;
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
