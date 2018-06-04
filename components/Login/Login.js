import React, { Component } from 'react';
import {KeyboardAvoidingView , StyleSheet}  from 'react-native';
import Logo from '../Logo';
import UserInput from '../Form/UserInput';
import Wallpaper from '../Wallpaper';
import ButtonSubmit from '../Form/ButtonSubmit';
import SignupSection from './SignupSection';
import usernameImg from '../../assets/images/username.png';
import passwordImg from '../../assets/images/password.png';

export default class Login extends Component {
  render() {
    return (
      <Wallpaper>
  
        <Logo />
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <UserInput
          source={usernameImg}
          placeholder="Email"
          autoCapitalize={'none'}
          returnKeyType={'go'}
          autoCorrect={false}
          style={styles.input}
        />
        <UserInput
          source={passwordImg}
          secureTextEntry={true}
          placeholder="Password"
          returnKeyType={'done'}
          autoCapitalize={'none'}
          autoCorrect={false}

        />
      </KeyboardAvoidingView>
        <SignupSection navigation={this.props.navigation}/>
        <ButtonSubmit title={'LOGIN'} />

      </Wallpaper>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  input:{
    marginBottom: 15
  }
});
