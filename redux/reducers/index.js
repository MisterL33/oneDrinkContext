import { SET_USER, REDIRECT_PROFILE, SET_MODAL_VISIBILITY } from "../constants/action-types";
import { LOGGED_IN } from "../constants/action-types";
const initialState = {
  user: null,
  logged: false,
  isModalVisible: false,
};
function rootReducer(state = initialState, action) {
  if (action.type === SET_USER) {
    return {...state, user: action.payload}
    
  }
  if (action.type === LOGGED_IN) {
    return Object.assign({}, state, {
      logged: (action.payload)
    });
  }

  if (action.type === SET_MODAL_VISIBILITY) {
    return Object.assign({}, state, {
      isModalVisible: (action.payload)
    });
  }

  if (action.type === REDIRECT_PROFILE) {
    return Object.assign({}, state, {
      redirectProfile: (action.payload)
    });
    }  
  return state;
}
export default rootReducer;