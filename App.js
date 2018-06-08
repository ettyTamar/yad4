import React  from 'react';
import Login from './components/Login/Login';
import App from './components/App';
import Register from './components/Register/Register';
import { createSwitchNavigator } from 'react-navigation';

export default createSwitchNavigator({
  Login: Login,
  App: App,
  Register: Register
});
