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


    componentDidMount = async () => {

      let userUid = null
      firebase.auth().onAuthStateChanged(async(user) => {
        if(user){
            userUid = user.providerData[0].uid
            firebase.database().ref("/users/" + userUid).once("value").then((snapshot) => {
                store.dispatch(setUser(snapshot.val()))
                this.props.navigation.navigate('App')
              })
            }else{
              this.props.navigation.navigate('Auth')
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