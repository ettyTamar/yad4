import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import Home from './Home/Home';
import Search from './Search/Search';
import About from './About/About';

const Nav = createDrawerNavigator({
  Home: {
    screen: Home,
  },
  Search: {
    screen: Search,
  },
  About: {
    screen: About,
  }
},
  {
    drawerWidth: 150,
    drawerPosition: 'right'
  });

export default Nav;