import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Dimensions } from "react-native";
import UserInput from '../Form/UserInput';
import Wallpaper from '../Wallpaper';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    }
  }

  static navigationOptions = { drawerLabel: "Search" };

  render() {
    return(
    <Wallpaper >
      <UserInput
        placeholder="Search"
        autoCapitalize={'none'}
        returnKeyType={'go'}
        autoCorrect={false}
        style={styles.input}
        onChangeText={(text) => { this.setState({ searchText: text.toString() }) }}
      />
    </Wallpaper>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    marginTop: 50,
  }
});
