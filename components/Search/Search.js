import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Dimensions } from "react-native";

export default class Search extends Component {
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

const styles = StyleSheet.create({
  searchBar: {
    flex: 1,
    alignItems: "center"
  },
  paddingLeft: 30,
  fontSize: 22,
  height: 10,
  flex: 0.1,
  borderWidth: 9,
  borderColor: "#E4E4E4"
});
