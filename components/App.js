import React from 'react';
import { createDrawerNavigator, createSwitchNavigator } from 'react-navigation';
import Home from './Home/Home';
import Search from './Search/Search';
import About from './About/About';
import Item from './Item/Item';
import Sell from './Sell/Sell';
import UserPage from './UserPage/UserPage';
import Login from './Login/Login';

const Nav = createDrawerNavigator({
  Home:{
    screen: Home,
  },
  Search: {
    screen: Search,
  },
  Post: {
    screen: Sell,
  },
  MyPosts: {
    screen: UserPage,
  },
  About: {
    screen: About,
  },
  Item: {
    screen: Item,
    navigationOptions :{
      drawerLabel: ()=>null,
    }
  },
  Login: {
    screen: Login,
    navigationOptions :{
      drawerLabel: ()=>null,
    }
  }

},
  {
    drawerWidth: 150,
    drawerPosition: 'right'
  });



export default Nav;