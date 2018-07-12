import React, { Component } from 'react';
import {
  View,
  Text,
  Picker,
  Button,
  Dimensions,
  StyleSheet,
  Image,
  Modal,
  TouchableHighlight,
  AsyncStorage,
  Alert,
  KeyboardAvoidingView
} from 'react-native';
import Wallpaper from '../Wallpaper';
import Menu from '../MenuButton';
import Handler from '../Handler';
import UserInput from '../Form/UserInput';
import { Icon } from 'react-native-elements';
import Camera from '../Camera';



export default class SellScreen extends Component {

  constructor(props) {
    super(props);

    this.Options = [];


    this.state = {
      hasCameraPermission: null,
      Options: [],
      pic: {},
      email: '',
      Firstname: '',
      lastName: '',
      catagory: '',
      modalVisible: false
    }
  }

  async componentDidMount() {
    let Options = [];

    try {
      const catagories = await Handler.GetCatagories();
      const Options = catagories.map((item, index) => {
        return <Picker.Item key={index} label={item} value={item} />
      });
      this.setState({ Options, catagory: catagories[0] })
    }
    catch (err) { console.log(err) }

    try {
      const value = await AsyncStorage.getItem('@yad4:user');
      if (value !== null) {

        let user = JSON.parse(value);

        this.setState({
          email: user.Email,
          Firstname: user.UName_First,
          lastName: user.UName_Last
        })

      }
    } catch (error) {
      // Error retrieving data
    }
  }




  static navigationOptions = {
    drawerLabel: 'Post'
  };



  TakePicture = (picture) => {
    this.setState({ modalVisible: false, pic: picture })
  }

  Post = () => {

    Handler.Post(this.state.email, this.state.catagory, this.state.name, this.state.phone, this.state.location, this.state.desc, this.state.price, this.state.pic.base64)
      .then((res) => { this.props.navigation.navigate('Home') })
      .catch((err) => {
        Alert.alert(
          '',
          err.toString(),
          [
            { text: 'OK' },
          ],
          { cancelable: false }
        )
      })
  }






  render() {

    return (
      <Wallpaper>
        <Menu navigation={this.props.navigation} />

        <View style={stlyes.container}>

          <KeyboardAvoidingView behavior='padding' enabled>
            <Picker
            style={stlyes.dropdown}
            selectedValue={this.state.catagory}
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
            onChangeText={(text) => { this.setState({ location: text.toString() }) }}
          />


          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            <Icon
              size={70}
              name='camera'
              type='evilicon'
              onPress={() => { this.setState({ modalVisible: true }) }} style={stlyes.margBottom} />

            <Image
              style={{ width: 100, height: 100, borderRadius: 10, marginBottom: 20 }}
              source={{ uri: this.state.pic.uri }} />
          </View>


          <UserInput
            placeholder="Description"
            autoCapitalize={'none'}
            returnKeyType={'go'}
            autoCorrect={false}
            style={stlyes.margBottom}
            onChangeText={(text) => { this.setState({ desc: text.toString() }) }}
          />


          <UserInput
            placeholder="Price"
            autoCapitalize={'none'}
            returnKeyType={'go'}
            autoCorrect={false}
            keyboardType={'numeric'}
            style={stlyes.margBottom}
            onChangeText={(text) => { this.setState({ price: text.toString() }) }}
          />


          <UserInput
            placeholder="Phone"
            autoCapitalize={'none'}
            returnKeyType={'go'}
            autoCorrect={false}
            keyboardType={'numeric'}
            style={stlyes.margBottom}
            onChangeText={(text) => { this.setState({ phone: text.toString() }) }}
          />
        </KeyboardAvoidingView >

          <Text>{this.state.Firstname}, {this.state.lastName}</Text>
          <Text style={stlyes.margBottom} >{this.state.email}</Text>

          <Button title='Post' onPress={this.Post} />

            
        <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => null}
          >
            <Button
              title='Close'
              onPress={() => {
                this.setState({ modalVisible: false });
              }} />
            <Camera Snap={this.TakePicture} />
          </Modal>


        </View>

      </Wallpaper>
    );
  }
}



const DEVICE_WIDTH = Dimensions.get('window').width;

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
    alignSelf: 'center',
  },



})
