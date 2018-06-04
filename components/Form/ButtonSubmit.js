import React, {Component} from 'react';
import Dimensions from 'Dimensions';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
  Image,
  Alert,
  View,
} from 'react-native';

import spinner from '../../assets/images/loading.gif';

const DEVICE_WIDTH = Dimensions.get('window').width;


export default class ButtonSubmit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };

    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
    this._onPress = this._onPress.bind(this);
  }

  _onPress() {
    if (this.state.isLoading) return;

    this.setState({isLoading: true});
    Animated.timing(this.buttonAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();


      this.props.Submit()
      .then( ()=>{
        this._onGrow();
      })
      .catch( (err)=>{
        Alert.alert(
          '',
          err,
          [
            {text: 'OK'},
          ],
          { cancelable: false }
        )
        this.setState({isLoading: false});
        this.buttonAnimated.setValue(0);
        this.growAnimated.setValue(0);
      })
       

 
  }

  _onGrow() {
    Animated.timing(this.growAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();
    setTimeout(() => {
      this.setState({isLoading: false});
      this.buttonAnimated.setValue(0);
      this.growAnimated.setValue(0);
      //this.props.navigation.navigate("Home");
    }, 300);
  }

  render() {
    const changeWidth = this.buttonAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [DEVICE_WIDTH - 40, 40],
    });
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 40],
    });

    return (
      <View style={styles.container}>
       <Animated.View
            style={[styles.circle, {transform: [{scale: changeScale}]}]}
          />
        <Animated.View style={{width: changeWidth}}>
          <TouchableOpacity
            style={styles.button}
            onPress={this._onPress}
            activeOpacity={1}>
            {this.state.isLoading ? 
              <Image source={spinner} style={styles.image} />
             : 
              <Text style={styles.text}>{this.props.title}</Text>
            }
          </TouchableOpacity>
         
        </Animated.View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: -95,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F035E0',
    height: 40,
    borderRadius: 20,
  },
  circle: {
    height: 40,
    width: 40,
    marginTop: 0,
    borderWidth: 1,
    borderColor: '#F035E0',
    borderRadius: 100,
    alignSelf: 'center',
    backgroundColor: '#F035E0',
    position: 'absolute',

  },
  text: {
    color: 'white',
    zIndex: 100,
  },
  image: {
    width: 24,
    height: 24,
  },
});

