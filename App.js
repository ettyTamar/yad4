import React, { Component } from "react";
import { Container } from "native-base";
import { StyleSheet } from "react-native";
import Login from "./components/Login";


export default class App extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Login/>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
