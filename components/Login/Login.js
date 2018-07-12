import React, { Component } from 'react';
import { KeyboardAvoidingView, StyleSheet,AsyncStorage } from 'react-native';
import Logo from '../Logo';
import UserInput from '../Form/UserInput';
import Wallpaper from '../Wallpaper';
import ButtonSubmit from '../Form/ButtonSubmit';
import SignupSection from './SignupSection';
import usernameImg from '../../assets/images/username.png';
import passwordImg from '../../assets/images/password.png';
import Handler from '../Handler';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }
  Submit = () => {
    return Handler.Login(this.state.email , this.state.password)
  }

  
async componentDidMount(){
  try {
    const value = await AsyncStorage.getItem('@yad4:user');

    if (value !== null){
      this.props.navigation.navigate("App" );
    }
  } catch (error) {
    console.log(error);
    
  }
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
            keyboardType={'email-address'}
            returnKeyType={'go'}
            autoCorrect={false}
            style={styles.input}
            onChangeText={(text) => { this.setState({ email: text.toString() }) }}
          />
          <UserInput
            secureTextEntry={true}
            source={passwordImg}
            secureTextEntry={true}
            placeholder="Password"
            returnKeyType={'done'}
            autoCapitalize={'none'}
            autoCorrect={false}
            onChangeText={(text) => { this.setState({ password: text.toString() }) }}

          />
        </KeyboardAvoidingView>
        
        <SignupSection />
        <ButtonSubmit title={'LOGIN'} Submit={this.Submit} />

      </Wallpaper>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    marginBottom: 15
  }
});
