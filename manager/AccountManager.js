import React, { Component } from "react";
import * as firebase from "firebase";
import store from "../redux/store/index";
import { loggedIn, setUser } from "../redux/actions/index";
window.store = store;
window.setUser = setUser;
window.loggedIn = loggedIn;


export async function updateFirebaseUser(user){
  if(!user.photo1){
    user.photo1 = ""
  }
  if(!user.photo2){
    user.photo2 = ""
  }
  if(!user.photo3){
    user.photo3 = ""
  }
  if(!user.description){
    user.description = ""
  }
  await firebase.database().ref("users/" + user.uid).set({
    email: user.email,
    pseudo: user.displayName,
    photo1: user.photo1,
    photo2: user.photo2,
    photo3: user.photo3,
    description: user.description,
    providerId: user.providerId,
    uid: user.uid
  });
}


export async function signInWithFacebook() {
  const appId = Expo.Constants.manifest.extra.facebook.appId;
  const permissions = ["public_profile", "email"];

  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
    appId,
    { permissions }
  );

  switch (type) {
    case "success": {
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      const credential = firebase.auth.FacebookAuthProvider.credential(token)
      const facebookProfileData = await firebase.auth().signInAndRetrieveDataWithCredential(credential)
      let user = facebookProfileData.user.providerData[0];
      user.photo1 = user.photoURL + "?type=large";
      let userData = {};
      await firebase.database().ref("/users/" + user.uid).once("value").then(async function(snapshot) {
        if (snapshot.val() == null) { // si le user n'existe pas dans firebase databse
          updateFirebaseUser(user) // on l'insert
          userData = updateLocalUser(user)
        } else { // si il existe déjà
          userData = updateLocalUser(snapshot.val()) // on prends les données de firebase et on créer localement l'user
        }
      })
      store.dispatch(setUser(userData));
      return Promise.resolve({ type: "success" });
    }
    case "cancel": {
      return Promise.reject({ type: "cancel" });
    }
  }
}

export function updateLocalUser(user){
  let userData = {}
  userData.email = user.email
  userData.pseudo = user.displayName
  userData.photo1 = user.photo1
  userData.photo2 = user.photo2,
  userData.photo3 = user.photo3,
  userData.description = user.description
  userData.providerId = user.providerId
  userData.uid = user.uid
  return userData
}

export async function uploadImageAsync(userId, uri, name){
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const ref = firebase
    .storage()
    .ref()
    .child('users/' + userId + '/' + name + '.png');
  const snapshot = await ref.put(blob);

  blob.close();

  return await snapshot.ref.getDownloadURL();
}



export async function getFireBaseUser(userId) {
  await firebase.database().ref("/users/" + userId).once("value").then(async function(snapshot) {
    store.dispatch(setUser(snapshot.val()))
  })
}

