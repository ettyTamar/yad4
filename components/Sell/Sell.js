import React, { Component } from 'react';
import { View, Text, Picker, PickerItem, Button, Dimensions, StyleSheet, Image } from 'react-native';
import Wallpaper from '../Wallpaper';
import Menu from '../MenuButton';
import handler from '../Handler';
import UserInput from '../Form/UserInput';
const Handler = new handler();


export default class SellScreen extends Component {

  constructor(props) {
    super(props);

    this.Options = [];


      this.state={
        catagory: '',
        Options: []
      }
  }

componentDidMount(){
  
  let Options = [];

  Handler.GetCatagories()
  .then((res) => {

    res.map((item) => {
      Options.push( <Picker.Item label={item} value={item} /> )
    });
    this.setState({Options})
  })
  .catch((err)=>{console.log(err)})
}

  static navigationOptions = {
    drawerLabel: 'Post'
  };


  Post = () => {
    return null;
  }


  render() {
    
    return (
      <Wallpaper>
        <Menu navigation={this.props.navigation} />

        <View style={stlyes.container}>

          <Picker
            selectedValue={'Test'}
            style={stlyes.dropdown}
            onValueChange={(itemValue) => this.setState({ catagory: itemValue })}>

            {this.state.Options}
            
          </Picker>



          <UserInput
            placeholder="Item name"
            autoCapitalize={'none'}
            returnKeyType={'go'}
            autoCorrect={false}
            style={stlyes.margBottom}
            onChangeText={(text) => { this.setState({ name: text.toString() }) }}
          />

          <UserInput
            placeholder="Location"
            autoCapitalize={'none'}
            returnKeyType={'go'}
            autoCorrect={false}
            style={stlyes.margBottom}
            onChangeText={(text) => { this.setState({ name: text.toString() }) }}
          />

          <Button title='Picture' onPress={this.Post} />
          <Image
            style={{ width: 50, height: 50, borderRadius: 10, marginBottom:20 }}
            source={{ uri: 'http://via.placeholder.com/50x50' }} />

          <UserInput
            placeholder="Description"
            autoCapitalize={'none'}
            returnKeyType={'go'}
            autoCorrect={false}
            style={stlyes.margBottom}
            onChangeText={(text) => { this.setState({ name: text.toString() }) }}
          />


          <UserInput
            placeholder="Price"
            autoCapitalize={'none'}
            returnKeyType={'go'}
            autoCorrect={false}
            style={stlyes.margBottom}
            onChangeText={(text) => { this.setState({ name: text.toString() }) }}
          />


          <UserInput
            placeholder="Phone"
            autoCapitalize={'none'}
            returnKeyType={'go'}
            autoCorrect={false}
            style={stlyes.margBottom}
            onChangeText={(text) => { this.setState({ name: text.toString() }) }}
          />

          <Text>Name</Text>
          <Text>Last Name</Text>
          <Text>Email</Text>

          <Button title='Post' onPress={this.Post} />
        </View>
      </Wallpaper>
    );
  }
}



const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const stlyes = StyleSheet.create({

  margBottom: {
    marginBottom: 20,
  },
  container: {
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  dropdown: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: DEVICE_WIDTH - 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 20,
    color: '#ffffff',
  },



})
