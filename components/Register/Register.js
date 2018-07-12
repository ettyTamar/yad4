import React, { Component } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import Wallpaper from '../Wallpaper';
import UserInput from '../Form/UserInput';
import ButtonSubmit from '../Form/ButtonSubmit';
import Handler from '../Handler';

export default class Register extends Component {

constructor(props){
  super(props)
  this.state = {
    email: '',
    pass: '',
    name: '',
    last_name: ''
  }
}

Submit = () =>{
  return Handler.Register(this.state.email, this.state.name, this.state.last_name, this.state.pass)
}

  render() {
    return (

      <Wallpaper>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <UserInput
            placeholder="Email"
            autoCapitalize={'none'}
            keyboardType={'email-address'}
            returnKeyType={'go'}
            autoCorrect={false}
            style={styles.input}
            onChangeText = {(text)=>{this.setState({email: text.toString()})}}
          />
          <UserInput
            placeholder="First name"
            returnKeyType={'go'}
            autoCapitalize={'none'}
            autoCorrect={false}
            style={styles.input}
            onChangeText = {(text)=>{this.setState({name: text.toString()})}}
          />
          <UserInput
            placeholder="Last name"
            returnKeyType={'go'}
            autoCapitalize={'none'}
            autoCorrect={false}
            style={styles.input}
            onChangeText = {(text)=>{this.setState({last_name: text.toString()})}}
          />
          <UserInput
            secureTextEntry={true}
            placeholder="Password"
            returnKeyType={'done'}
            autoCapitalize={'none'}
            autoCorrect={false}
            style={styles.input}
            onChangeText = {(text)=>{this.setState({pass: text.toString()})}}
          />

        </KeyboardAvoidingView>

        <ButtonSubmit title={'REGISTER'} Submit = {this.Submit}/>
        <View style={styles.text_container}>
          <TouchableOpacity onPress={() => { this.props.navigation.navigate('Login') }}>
            <Text style={styles.text}>Back</Text>
          </TouchableOpacity>
        </View>

      </Wallpaper>

    );
  }
}


const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 150,
    marginBottom: 40,
  },
  input: {
    marginBottom: 10,
  },
  text_container: {
    flex: 1,
    top: -110,
    marginRight: 40,
    alignItems: 'flex-end',
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
  }
});
