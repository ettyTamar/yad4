import React, { Component } from 'react';
import {  View, Button } from 'react-native';
import { Camera, Permissions } from 'expo';


export default class MyCamera extends Component {

constructor(props){
    super(props);
    
    this.state={
        hasCameraPermission: null,
    }
}

async componentDidMount(){
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    

  
  
}

    Picture = async() =>{
        if (this.camera) {
          const picture = await this.camera.takePictureAsync({quality: 0.1,base64: true})
          this.props.Snap(picture);
        } 
    }


  render() {
    return (
      
        <Camera ref={ref => { this.camera = ref; }} style={{ flex: 1 }} type={Camera.Constants.Type.back}>
        
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
          }}>
        
        </View>
        <Button title='Snap'  onPress={this.Picture}/>
      </Camera>
    );
  }
}
