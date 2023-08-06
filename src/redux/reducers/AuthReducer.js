import ActionTypes from "../actionTypes/actionTypes";

let initialState = {
  userExist: false,
userInfo : null
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.USER_EXIST:
      state = {...state, userExist: action.payload};
      break;

      case ActionTypes.USER_INFO:
        state = {...state, userInfo: action.payload};
        break;

        case ActionTypes.LOGOUT:
          state = {  userExist: false , userInfo: null ,};
          break;

   
    default:
      break;
  }
  return state;
};

export default AuthReducer;