import React, { Component } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Wallpaper from '../Wallpaper';
import UserInput from '../Form/UserInput';
import usernameImg from '../../assets/images/username.png';
import passwordImg from '../../assets/images/password.png';
import ButtonSubmit from '../Form/ButtonSubmit';


export default class Register extends Component {

  Submit = () =>{
    console.log("REGISTERED");
    
  }
  render() {
    return (

      <Wallpaper>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <UserInput
            placeholder="Email"
            autoCapitalize={'none'}
            returnKeyType={'go'}
            autoCorrect={false}
          />
          <UserInput
            secureTextEntry={true}
            placeholder="First name"
            returnKeyType={'go'}
            autoCapitalize={'none'}
            autoCorrect={false}
            style={styles.input}
          />
          <UserInput
            secureTextEntry={true}
            placeholder="Last name"
            returnKeyType={'go'}
            autoCapitalize={'none'}
            autoCorrect={false}
            style={styles.input}
          />
          <UserInput
            secureTextEntry={true}
            placeholder="Password"
            returnKeyType={'done'}
            autoCapitalize={'none'}
            autoCorrect={false}
            style={styles.input}
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


const styles = StyleSheet.create({
  container: {
    flex: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 150,
  },
  input: {
    marginTop: 10,
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
