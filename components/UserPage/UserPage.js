import React, { Component } from 'react';
import {  View, Text, Button, FlatList , AsyncStorage } from 'react-native';
import handler from '../Handler';
import Menu from '../MenuButton';
import Wallpaper from '../Wallpaper';
import Item from '../Item/DeleteItem';
const Handler = new handler();



export default class UserPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            Items: []
        }
        this.Items = []; 
        this.email = ''
    }

    static navigationOptions = {
        drawerLabel: 'My Posts'
      };
    

      getUpdate = () => {
        this.setState({refreshing: true})
        Handler.GetItems()
        .then((res)=>{
          const Items = res.length > 0 ? res.filter(item=> item.Email ==this.email) : [{ItemDscription: 'No Items'}]
          
          this.setState({refreshing: false, Items})
        })
        .catch((err)=>{console.error(err)})
        
      
      }

      
    async componentDidMount(){
        this.getUpdate();
        try {
          const value = await AsyncStorage.getItem('@yad4:user');
      
          if (value !== null){
            this.email = JSON.parse(value).Email;
          }
        } catch (error) {
          console.log(error);
          
        }
      }


_keyExtractor = (item, index) => index.toString();



  render() {
    return (


    <Wallpaper>
        <Menu navigation = {this.props.navigation}/>
      <View style={{direction: 'rtl'}}>
        
        <FlatList
        style={{marginTop: 30}}
          data={this.state.Items}
          keyExtractor={this._keyExtractor}
          renderItem={({ item , index }) => <Item email={this.email} key={index} ItemData = {item}/> }

        />
      </View>
      </Wallpaper>
    );
  }
}

