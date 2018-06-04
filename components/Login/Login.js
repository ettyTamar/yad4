import React, { Component } from 'react';
import {KeyboardAvoidingView , StyleSheet}  from 'react-native';
import Logo from '../Logo';
import UserInput from '../Form/UserInput';
import Wallpaper from '../Wallpaper';
import ButtonSubmit from '../Form/ButtonSubmit';
import SignupSection from './SignupSection';
import usernameImg from '../../assets/images/username.png';
import passwordImg from '../../assets/images/password.png';

const URL = "http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site04/WebService.asmx";

export default class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
      email: 'orhay@g2mail.com',
      password: '1234'
    }
  }
  Submit = () =>{
    return new Promise( (resolve , reject)=>{
      fetch(URL + '/Login', {
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        }),
        headers: {
          'content-type': 'application/json; charset=UTF-8'
        },
        method: 'POST'
        
      })
      .then( (res) =>{ return res.json()})
      .then( (json) =>{

        if(json.d != null){
          resolve(json)
        }else{
          reject("email or password was incorrect");
        }
      })
      .catch( (err)=>{
        console.log(err);
        reject(err);
      })
    })
    
    
  }

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
        <ButtonSubmit title={'LOGIN'} Submit = {this.Submit}/>

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
