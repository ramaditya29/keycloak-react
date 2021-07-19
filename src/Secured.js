import React, { Component } from 'react';
import Keycloak from 'keycloak-js';
export default class Secured extends Component{
    state = {
        keycloak: null, 
        authenticated : false
    };

    componentDidMount(){
        const keycloak = Keycloak('/keycloak.json');
        keycloak.init({onLoad: 'login-required'}).then( async authenticated => {
            this.setState({keycloak: keycloak, authenticated: authenticated});
            await keycloak.loadUserProfile();
            console.log('the keycloak details is: ' , keycloak);
            console.log('keycloak', keycloak.token);
            if(authenticated){
                window.accessToken = keycloak.token;
            }
        })
    }

    render(){
        if(this.state.keycloak){
            if(this.state.authenticated){
                return (<div>My App</div>)
            } else {
                return (<div>Unable to authenticate</div>)
            }
        }
        return (<div>Setting up the app</div>)
    }
}