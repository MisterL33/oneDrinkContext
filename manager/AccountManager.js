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
            await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);  // Set persistent auth state
            const credential = firebase.auth.FacebookAuthProvider.credential(token);
            const facebookProfileData = await firebase.auth().signInAndRetrieveDataWithCredential(credential);  // Sign in with Facebook credential
      
            // Do something with Facebook profile data
            // OR you have subscribed to auth state change, authStateChange handler will process the profile data
            store.dispatch( facebookSignIn(facebookProfileData.user.providerData ))
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
