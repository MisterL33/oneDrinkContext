import { SET_USER, REDIRECT_PROFILE, SET_MODAL_VISIBILITY } from "../constants/action-types";
import { LOGGED_IN } from "../constants/action-types";

export function setUser(payload) {
  return { type: SET_USER, payload };
}
export function loggedIn(payload) {
    return { type: LOGGED_IN, payload };
}

export function setModalVisibility(payload) {
  return { type: SET_MODAL_VISIBILITY, payload };
}

export function redirectProfile(payload){
  return { type: REDIRECT_PROFILE, payload}
}
  
