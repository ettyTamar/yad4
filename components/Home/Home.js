import React, { Component } from 'react';
import { View, StyleSheet, Text, Button, FlatList, RefreshControl } from 'react-native';
import { Icon } from 'react-native-elements'
import { Constants } from 'expo';
import Item from './Item';
import Menu from '../MenuButton';

const URL = "http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site04/WebService.asmx";

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
    fetch("http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site04/WebService.asmx/GetAllItems", {
      headers: {
        'content-type': 'application/json; charset=UTF-8'
      },
      method: 'POST'
    })
    .then( res => res.json())
    .then( (json) =>{
      this.Items = JSON.parse(json.d);
      this.setState({refreshing: false})
    })
    .catch( (err) => {
      console.log( err );
    })
  }

  componentDidMount(){
    this.getUpdate();
  }

  render() {

    return (

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
