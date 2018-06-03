import React, { Component } from 'react';
import Login from './components/Login/Login';
import Home from './components/Home';
import Register from './components/Register/Register';
import { createSwitchNavigator } from 'react-navigation';

export default createSwitchNavigator({
  Login: Login,
  Home: Home,
  Register: Register
});
