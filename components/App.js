import React from 'react';
import { createDrawerNavigator, createSwitchNavigator } from 'react-navigation';
import Home from './Home/Home';
import Search from './Search/Search';
import About from './About/About';
import Item from './Item/Item';

const Nav = createDrawerNavigator({
  Home: {
    screen: Home,
  },
  Search: {
    screen: Search,
  },
  About: {
    screen: About,
  },
  Item: {
    screen: Item,
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