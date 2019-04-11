import React from 'react';
import {View,ActivityIndicator, StatusBar, ImageBackground, ScrollView} from 'react-native';
import styles from '../styles/authloading';
import * as firebase from 'firebase';
import fond from '../assets/images/fond.jpg';
import store from '../redux/store';
import { setUser } from "../redux/actions/index";
firebase.initializeApp(Expo.Constants.manifest.extra.firebase);

export default class AuthLoadingScreen extends React.Component {
    constructor() {
      super();
    }
  
    componentWillMount(){
      firebase.auth().onAuthStateChanged((user) =>{
        if(user)
        {
          store.dispatch(setUser(user.providerData[0]))
          this.props.navigation.navigate('App');
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