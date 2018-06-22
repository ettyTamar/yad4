

const WebService = 'http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site04/WebService.asmx'

export default class Handler {


    Register(email ,name , last_name, pass ){
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
            .then( (json) =>{
        
              
              if(json.d != 'Email Adress already taken'){
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

    Login(email , password){
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
              .then((json) => {
                console.log(json.d);
      
                if (json.d != null) {
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

    GetItems() {
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


};
