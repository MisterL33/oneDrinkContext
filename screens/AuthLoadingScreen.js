import React from 'react';
import {View,ActivityIndicator, StatusBar, ImageBackground, ScrollView} from 'react-native';
import styles from '../styles/authloading';
import * as firebase from 'firebase';
import fond from '../assets/images/fond.jpg';
import store from '../redux/store';
import { setUser } from "../redux/actions/index";
import {updateLocalUser} from '../manager/AccountManager';
firebase.initializeApp(Expo.Constants.manifest.extra.firebase);

export default class AuthLoadingScreen extends React.Component {
    constructor() {
      super();
    }
  
    componentWillMount(){
      let userData = {}
      firebase.auth().onAuthStateChanged((user) =>{
        if(user)
        {
          firebase.database().ref("/users/" + user.providerData[0].uid).once("value").then(async = (snapshot) => {
            userData = updateLocalUser(snapshot.val())
            store.dispatch(setUser(userData))
            this.props.navigation.navigate('App');
          })
        }
        else
        {
          this.props.navigation.navigate('Auth');
        }
      })
    }
  
    render() {
      return (
        <ImageBackground source={fond} style={styles.container}>
            <ActivityIndicator size="large" style={styles.spinner} />
            <StatusBar barStyle="default" />
        </ImageBackground>
      );
    }
  }