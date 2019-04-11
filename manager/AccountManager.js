import React, { Component } from "react";
import * as firebase from 'firebase';
import store from "../redux/store/index";
import { facebookSignIn, loggedIn } from "../redux/actions/index";
window.store = store;
window.facebookSignIn = facebookSignIn;
window.loggedIn = loggedIn;


    export async function  signInWithFacebook(){
        const appId = Expo.Constants.manifest.extra.facebook.appId;
        const permissions = ['public_profile', 'email'];  
        
        const {
          type,
          token,
        } = await Expo.Facebook.logInWithReadPermissionsAsync(
          appId,
          {permissions}
        );
      
        switch (type) {
          case 'success': {
            await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);  
            const credential = firebase.auth.FacebookAuthProvider.credential(token);
            const facebookProfileData = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
            firebase.database().ref('users/' + facebookProfileData.user.providerData[0].uid).set({
              pseudo: facebookProfileData.user.providerData[0].displayName,
              email: facebookProfileData.user.providerData[0].email,
              profile_picture : facebookProfileData.user.providerData[0].photoURL
            });
            store.dispatch( facebookSignIn(facebookProfileData.user.providerData[0]))
            return Promise.resolve({type: 'success'});
          }
          case 'cancel': {
            return Promise.reject({type: 'cancel'});
          }
        }
      }

      export async function checkConnected(){
        let user = await firebase.auth().currentUser()
        console.log(user)
      }


