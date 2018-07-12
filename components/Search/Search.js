import React, { Component } from "react";
import { Dimensions,View, StyleSheet, TextInput, FlatList } from "react-native";
import Wallpaper from '../Wallpaper';
import Menu from '../MenuButton';
import Item from '../Home/ItemPrev';
import Handler from '../Handler';
import { Icon } from 'react-native-elements'


export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      items: []
    }
    this.allItems = [];
  }

  static navigationOptions = { drawerLabel: "Search" };

  Search = () => {
    let filtered = this.allItems.filter((item) => {
      return (item.CatagoryName.includes(this.state.searchText) | item.ItemName.includes(this.state.searchText))
    })
    this.setState({ items: filtered });

  }

  componentDidMount() {
    Handler.GetItems()
      .then((res) => {
        this.allItems = res;
      })
      .catch((err) => { console.error(err) })
  }

  render() {
    return (
      <Wallpaper >

        <Menu navigation={this.props.navigation} />
        <View style={{flexDirection: 'row', marginTop: 30}}>
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor="white"
          underlineColorAndroid="transparent"
          onChangeText = { (text) => this.setState({searchText: text})}
        />
      
        <Icon
            name='search'
            type='evilicon'
            color='white'
            size={50}
            style={{alignSelf: 'center',justifyContent: 'center'}}
            onPress={this.Search} />
            </View>
        <FlatList
          style={{ marginTop: 30 }}
          data={this.state.items}
          renderItem={({ item, index }) => <Item key={index} ItemData={item} />}
        />

      </Wallpaper>
    )
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: DEVICE_WIDTH - 100,
    height: 40,
    paddingLeft: 45,
    borderRadius: 20,
    color: '#ffffff',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
