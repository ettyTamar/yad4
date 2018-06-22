import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, Button, FlatList } from "react-native";
import { Dimensions } from "react-native";
import UserInput from '../Form/UserInput';
import Wallpaper from '../Wallpaper';
import Menu from '../MenuButton';
import Item from '../Home/ItemPrev';
import handler from '../Handler';


const Handler = new handler();

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      items: []
    }
    this.allItems = [];
  }

  static navigationOptions = { drawerLabel: "Search" };

  Search = () =>{
    let filtered = this.allItems.filter( (item) => {
      return(item.CatagoryName.includes(this.state.searchText) | item.ItemName.includes(this.state.searchText))
    })
    this.setState({items: filtered});

  }

  componentDidMount(){
    Handler.GetItems()
    .then( (res) => {
      this.allItems = res;
    })
    .catch( (err) => {console.error(err)})
  }
  
  render() {
    return(
    <Wallpaper >
      
      <Menu navigation = {this.props.navigation}/>
      <UserInput
        placeholder="Search"
        autoCapitalize={'none'}
        returnKeyType={'go'}
        autoCorrect={false}
        style={styles.input}
        onChangeText={(text) => { this.setState({ searchText: text }) }}
      />
      <Button title="Go" onPress={this.Search}/>
      
      <FlatList
        style={{marginTop: 30}}
          data={this.state.items}
          renderItem={({ item , index }) => <Item key={index} ItemData = {item}/>}
        />

    </Wallpaper>
    )}
}

const styles = StyleSheet.create({
  input: {
    marginTop: 50,
  }
});
