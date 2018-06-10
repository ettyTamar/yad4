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
<<<<<<< HEAD
      screen: Search,
=======
    screen: Search,
    },
    About:{
    screen: About,
>>>>>>> 7e594e28ede57db889c5521bcb644dd92c7b1108
    }
  },
    {
        drawerWidth: 150,
        drawerPosition: 'right'
    });

export default withNavigation(Nav);