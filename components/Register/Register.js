import React, { Component } from 'react';
import { KeyboardAvoidingView, StyleSheet,Text } from 'react-native';
import Wallpaper from '../Wallpaper';
import UserInput from '../Form/UserInput';
import usernameImg from '../../assets/images/username.png';
import passwordImg from '../../assets/images/password.png';
import ButtonSubmit from '../Form/ButtonSubmit';


export default class Register extends Component {

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
  

        </Wallpaper>
        
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    marginTop: 10,
  }
});
