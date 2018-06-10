import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Dimensions } from "react-native";
import Input from '../Form/UserInput';
import Wallpaper from '../Wallpaper';

export default class Search extends Component {
<<<<<<< HEAD
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    }
  }

  static navigationOptions = { drawerLabel: "Search" };

      filterNotes = (searchText, notes) => {
      let text = searchText.toLowerCase();

      return filter(notes, n => {
        let note = n.body.toLowerCase();
        return note.search(text) !== -1;
      });
    };

componentDidMount(){
  console.log(this.props.navigation);
  
}

  render() {
    return(
      <Wallpaper>
      <Input
          placeholder="Search"
          autoCapitalize={'none'}
          returnKeyType={'go'}
          autoCorrect={false}
          style={styles.input}
          onChangeText = {(text)=>{this.setState({searchText: text.toString()})}}
        />
    </Wallpaper>

    );
  }

}
=======
                 constructor(props) {
                   super(props);
                 }

                 static navigationOptions = { drawerLabel: "Search" };

                 filterNotes = (searchText, notes) => {
                   let text = searchText.toLowerCase();

                   return filter(notes, n => {
                     let note = n.body.toLowerCase();
                     return note.search(text) !== -1;
                   });
                 };

                 getItem = () => {
                   this.setState({ refreshing: true });
                     then(res => res.json())
                     .then(json => {
                       this.Items = JSON.parse(json.d);
                       this.setState({ refreshing: false });
                     })
                  
                 };

                 setSearchText = text => {
                   this.setState({ searchText: text });
                 };

                 render() {
                   <View style={{ direction: "rtl" }}>
                     <TextInput style={styles.searchBar} value={this.state.searchText} onChangeText={this.setSearchText} placeholder="Search" />
                   </View>;
                 }
               }
>>>>>>> 7e594e28ede57db889c5521bcb644dd92c7b1108

const styles = StyleSheet.create({
  input:{
    marginTop: 50,
  }
});
