import {AsyncStorage }  from 'react-native'
import { Permissions, Notifications } from 'expo';

const WebService = 'http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site04/WebService.asmx'


export default class Handler {




    static Register(email ,name , last_name, pass ){
        return new Promise( (resolve , reject)=>{
            fetch(WebService + '/Register', {
              body: JSON.stringify({
                email: email,
                fname: name,
                lname: last_name,
                password: pass
              }),
              headers: {
                'content-type': 'application/json; charset=UTF-8'
              },
              method: 'POST'
              
            })
            .then( (res) =>{ return res.json()})
            .then( async (json) =>{
        
              
              if(json.d != 'Email Adress already taken'){
                try {
                    await AsyncStorage.setItem('@yad4:user', json.d);
                  } catch (error) {
                    // Error saving data
                  }
                resolve(json)
              }else{
                reject(json.d);
              }
            })
            .catch( (err)=>{
              console.log(err);
              reject(err);
            })
          })
          
    }

    static Login(email , password){
        return new Promise((resolve, reject) => {
            fetch(WebService + '/Login', {
              body: JSON.stringify({
                email: email,
                password: password
              }),
              headers: {
                'content-type': 'application/json; charset=UTF-8'
              },
              method: 'POST'
      
            })
              .then((res) => { return res.json() })
              .then(async (json) => {
  
                if (json.d != null) {
                    try {
                        await AsyncStorage.setItem('@yad4:user', json.d);
                      } catch (error) {
                        // Error saving data
                      }
                  resolve(json)
                } else {
                  reject("email or password was incorrect");
                }
      
      
              })
              .catch((err) => {
                console.log(err);
                reject(err);
              })
      
          })


    }

    static GetItems() {
        return new Promise( (resolve , reject) =>{
        fetch(`${WebService}/GetAllItems`, {
            headers: {
                'content-type': 'application/json; charset=UTF-8'
            },
            method: 'POST'
        })
            .then(res => res.json())
            .then((json) => {
                resolve(JSON.parse(json.d));
               
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    static DeleteItem(email, id){
        return new Promise( (resolve , reject) =>{
            fetch(`${WebService}/DeleteItem`, {
                headers: {
                    'content-type': 'application/json; charset=UTF-8'
                },
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    id: id
                  }),
            })
                .then(res => res.json())
                .then((json) => {
                    resolve(JSON.parse(json.d));
                   
                })
                .catch((err) => {
                    reject(err)
                })
            })
    }

    static GetCatagories(){
      return new Promise( (resolve , reject) =>{
        fetch(`${WebService}/GetCatagories`, {
            headers: {
                'content-type': 'application/json; charset=UTF-8'
            },
            method: 'POST'
        })
            .then(res => res.json())
            .then((json) => {
                resolve(JSON.parse(json.d));
               
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    static  Post(email , catagory , name , phone, location, description, price ,image64 ){
 
        let data = {
            email: email,
            catagory: catagory,
            name: name,
            phone: phone,
            location: location,
            description: description,
            price: parseInt(price), 
            image64: image64,
    
          };
  
      return new Promise( (resolve , reject) =>{
        fetch(`${WebService}/PostItem`, {
            headers: {
                'content-type': 'application/json; charset=UTF-8'
            },
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then((res) => {res.json()})
        .then((json) => {
     
            resolve(json);
           
        })
            .catch((err) => {
                reject(err)
            })
        })
    }




      
     static async registerForPushNotificationsAsync(email, catagory) {
        const { status: existingStatus } = await Permissions.getAsync(
          Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;
      
        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
          // Android remote notification permissions are granted during the app
          // install, so this will only ask on iOS
          const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
          finalStatus = status;
        }
      
        // Stop here if the user did not grant permissions
        if (finalStatus !== 'granted') {
          return;
        }
      
        // Get the token that uniquely identifies this device
        let token = await Notifications.getExpoPushTokenAsync();
        
        // POST the token to your backend server from where you can retrieve it to send push notifications.
        fetch(WebService+ '/RegisterNotification', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token , email, catagory})
        })
      }



      static UnSub(email){
       
          fetch(`${WebService}/UnSub`, {
              headers: {
                  'content-type': 'application/json; charset=UTF-8'
              },
              method: 'POST',
              body: JSON.stringify({ email})
          })
        }
      
  



};
