import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Dimensions } from "react-native";
import UserInput from '../Form/UserInput';
import Wallpaper from '../Wallpaper';
import Menu from '../MenuButton';

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
      
      <Menu navigation = {this.props.navigation}/>
      <UserInput
        placeholder="Search"
        autoCapitalize={'none'}
        returnKeyType={'go'}
        autoCorrect={false}
        style={styles.input}
        onChangeText={(text) => { this.setState({ searchText: text.toString() }) }}
      />
    </Wallpaper>
<<<<<<< HEAD
    );
  }
=======
    )}
>>>>>>> 4a9018bac9177eac880bdccbaf6ad8d19c11a0e2
}

const styles = StyleSheet.create({
  input: {
    marginTop: 50,
  }
});
