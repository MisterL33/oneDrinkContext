import { SIGN_IN_FACEBOOK, SET_USER, REDIRECT_PROFILE } from "../constants/action-types";
import { LOGGED_IN } from "../constants/action-types";
const initialState = {
  user: null,
  logged: false
};
function rootReducer(state = initialState, action) {
  if (action.type === SIGN_IN_FACEBOOK) {
    return {...state, user: action.payload}
    
  }
  if (action.type === LOGGED_IN) {
    return Object.assign({}, state, {
      logged: (action.payload)
    });
  }
  if (action.type === SET_USER) {
    return {...state, user: action.payload}
    }
  if (action.type === REDIRECT_PROFILE) {
    return Object.assign({}, state, {
      redirectProfile: (action.payload)
    });
    }  
  return state;
}
export default rootReducer;