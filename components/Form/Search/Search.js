import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import base from "re-base";


export default class Search extends Component {
                 constructor(props) {
                   super(props);
                 }

                 static navigationOptions = { drawerLabel: "Search" };
                 render() {
                   <TextInput style={styles.searchBar} value={this.state.searchText} onChange={this.setSearchText.bind(this)} placeholder="Search" />;

                   setSearchText = event => {
                     let searchText = event.nativeEvent.text;
                     this.setState({ searchText });

                     base.fetch("notes", {
                       context: this,
                       asArray: true,
                       then(data) {
                         let filteredData = this.filterNotes(
                           searchText,
                           data
                         );
                         this.setState({
                           dataSource: this.ds.cloneWithRows(
                             filteredData
                           ),
                           rawData: data
                         });
                       }
                     });
                   };

                   filterNotes = (searchText, notes) => {
                     let text = searchText.toLowerCase();

                     return filter(notes, n => {
                       let note = n.body.toLowerCase();
                       return note.search(text) !== -1;
                     });
                   };
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
