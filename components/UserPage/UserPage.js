import React, { Component } from 'react';
import {  View,  FlatList , AsyncStorage } from 'react-native';
import Handler from '../Handler';
import Menu from '../MenuButton';
import Wallpaper from '../Wallpaper';
import Item from '../Item/DeleteItem';


export default class UserPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            Items: []
        }
        this.email = ''
    }

    static navigationOptions = {
        drawerLabel: 'My Posts'
      };
    

      getUpdate = () => {
        this.setState({refreshing: true})
        Handler.GetItems()
        .then((items)=>{
          const Items = items.filter(item =>  item.Email == this.email)
          this.setState({refreshing: false, Items})
        })
        .catch((err)=>{console.error(err)})
        
      
      }

      
    async componentDidMount(){
        
        try {
          const value = await AsyncStorage.getItem('@yad4:user');
      
          if (value !== null){
            this.email = JSON.parse(value).Email;
          }
        } catch (error) {
          console.log(error);
          
        }
        this.getUpdate();
      }


_keyExtractor = (item, index) => index.toString();
_renderItem = ({ item , index }) => <Item email={this.email} update = {this.getUpdate} key={index} ItemData = {item}/>;


  render() {
    return (


    <Wallpaper>
        <Menu navigation = {this.props.navigation}/>
      <View style={{direction: 'rtl'}}>
        
        <FlatList
        style={{marginTop: 30}}
          data={this.state.Items}
          keyExtractor={this._keyExtractor}
          renderItem={ ({ item , index }) => <Item email={this.email} update = {this.getUpdate} key={index} ItemData = {item}/> }

        />
      </View>
      </Wallpaper>
    );
  }
}

