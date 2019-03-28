import { SIGN_IN_FACEBOOK, REDIRECT_PROFILE } from "../constants/action-types";
import { LOGGED_IN } from "../constants/action-types";
import { SET_USER } from "../constants/action-types";

export function facebookSignIn(payload) {
  return { type: SIGN_IN_FACEBOOK, payload };
}
export function loggedIn(payload) {
    return { type: LOGGED_IN, payload };
  }

export function setUser(payload) {
    return { type: SET_USER, payload };
  }  

export function redirectProfile(payload){
  return { type: REDIRECT_PROFILE, payload}
}
  
