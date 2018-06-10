import React from 'react';
import {createDrawerNavigator} from 'react-navigation';
import Home from './Home/Home';
import Search from './Search/Search';
import {withNavigation} from 'react-navigation';

const Nav = createDrawerNavigator({
    Home: {
      screen: Home,
    },
    Search:{
      screen: Search,
    }
  },
    {
        drawerWidth: 150,
        drawerPosition: 'right'
    });

export default withNavigation(Nav);