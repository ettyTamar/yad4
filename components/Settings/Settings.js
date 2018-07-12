import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    AsyncStorage,
    Switch,
    Picker,
    Dimensions
} from 'react-native';
import Wallpaper from '../Wallpaper';
import Menu from '../MenuButton';
import Handler from '../Handler';

export default class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Notification: false,
            catagory: 'אומנות',
            catagories: []
        }


    }


    LogOut = () => {
        AsyncStorage.removeItem("@yad4:user");
        this.props.navigation.navigate("Login");

    }


    UpdateNotifi = async () => {
        const user = await AsyncStorage.getItem("@yad4:user");
        const email = JSON.parse(user).Email;
 
        if (this.state.Notification) {
            Handler.registerForPushNotificationsAsync(email, this.state.catagory);
        }
        else {
            Handler.UnSub(email);
        }
    }

    async componentDidMount() {
        this.setState({ catagories: await Handler.GetCatagories() })

    }

    render() {
        return (
            <Wallpaper>

                <Menu navigation={this.props.navigation} />

                <View style={styles.container}>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.text}>
                            Notification
                        </Text>

                        <Switch
                            onValueChange={(value) => this.setState({ Notification: value })}
                            value={this.state.Notification}
                            style={styles.switch}
                        />



                    </View>
                    {this.state.Notification ?
                        <Picker
                            style={styles.dropdown}
                            selectedValue={this.state.catagory}
                            onValueChange={(itemValue) => this.setState({ catagory: itemValue })}>

                            {this.state.catagories.map((catagory, index) => { return <Picker.Item key={index} label={catagory} value={catagory} /> })}
                        </Picker>
                        : null}

                    <Button title="Update" onPress={this.UpdateNotifi} />
                </View>
                <Button title="LOG OUT" onPress={this.LogOut} />

            </Wallpaper>
        )
    }
}


const DEVICE_WIDTH = Dimensions.get('window').width;

styles = StyleSheet.create({
    container: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 30,
    },
    switch: {
        margin: 20,
        transform: [{ scaleX: 2 }, { scaleY: 2 }]
    },
    dropdown: {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        width: DEVICE_WIDTH - 40,
        height: 40,
        borderRadius: 20,
        marginBottom: 20,
        color: '#ffffff',
        alignSelf: 'center',
    }

})
