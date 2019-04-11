import React, { Component } from "react";
import * as firebase from "firebase";
import store from "../redux/store/index";
import { facebookSignIn, loggedIn } from "../redux/actions/index";
window.store = store;
window.facebookSignIn = facebookSignIn;
window.loggedIn = loggedIn;

export async function signInWithFacebook() {
  const appId = Expo.Constants.manifest.extra.facebook.appId;
  const permissions = ["public_profile", "email"];

  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
    appId,
    { permissions }
  );

  switch (type) {
    case "success": {
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      const facebookProfileData = await firebase.auth().signInAndRetrieveDataWithCredential(credential);

      let user = facebookProfileData.user.providerData[0];
      user.largePhoto = user.photoURL + "?type=large";
      user.description = user;
      let userData = {};
      await firebase.database().ref("/users/" + facebookProfileData.user.providerData[0].uid).once("value").then(async function(snapshot) {
          if (snapshot.val() == null) {
            await firebase.database().ref("users/" + facebookProfileData.user.providerData[0].uid).set({
                email: facebookProfileData.user.providerData[0].email,
                pseudo: facebookProfileData.user.providerData[0].displayName,
                largePhoto: user.largePhoto,
                providerId: facebookProfileData.user.providerData[0].providerId,
                uid: facebookProfileData.user.providerData[0].uid
              });
          } else {
            userData.email = snapshot.val().email
            userData.pseudo = snapshot.val().pseudo
            userData.largePhoto = snapshot.val().largePhoto
            userData.providerId = snapshot.val().providerId
            userData.uid = snapshot.val().uid
          }
        });
        console.log(userData)
      store.dispatch(facebookSignIn(userData));
      return Promise.resolve({ type: "success" });
    }
    case "cancel": {
      return Promise.reject({ type: "cancel" });
    }
  }
}
