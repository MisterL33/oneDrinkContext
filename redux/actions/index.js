import { SET_USER, REDIRECT_PROFILE } from "../constants/action-types";
import { LOGGED_IN } from "../constants/action-types";

export function setUser(payload) {
  return { type: SET_USER, payload };
}
export function loggedIn(payload) {
    return { type: LOGGED_IN, payload };
  }

export function redirectProfile(payload){
  return { type: REDIRECT_PROFILE, payload}
}
  
