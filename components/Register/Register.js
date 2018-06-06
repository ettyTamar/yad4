import React, { Component } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Wallpaper from '../Wallpaper';
import UserInput from '../Form/UserInput';
import usernameImg from '../../assets/images/username.png';
import passwordImg from '../../assets/images/password.png';
import ButtonSubmit from '../Form/ButtonSubmit';

const URL = "http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site04/WebService.asmx";

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
  return new Promise( (resolve , reject)=>{
    fetch(URL + '/Register', {
      body: JSON.stringify({
        email: this.state.email,
        fname: this.state.name,
        lname: this.state.last_name,
        password: this.state.pass
      }),
      headers: {
        'content-type': 'application/json; charset=UTF-8'
      },
      method: 'POST'
      
    })
    .then( (res) =>{ return res.json()})
    .then( (json) =>{

      
      if(json.d != 'Email Adress already taken'){
        resolve(json)
      }else{
        reject(json.d);
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
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <UserInput
            placeholder="Email"
            autoCapitalize={'none'}
            returnKeyType={'go'}
            autoCorrect={false}
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
