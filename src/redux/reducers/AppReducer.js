import ActionTypes from "../actionTypes/actionTypes";

let initialState = {
  showAlert: false,
  alertMessage: null,
  loading: false,
  theme: false,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SHOW_ALERT:
      state = {...state, showAlert: true, alertMessage: action.payload};
      break;

    case ActionTypes.HIDE_ALERT:
      state = {...state, showAlert: false, alertMessage: null};
      break;

    case ActionTypes.SHOW_LOADING:
      state = {...state, loading: true};
      break;

    case ActionTypes.HIDE_LOADING:
      state = {...state, loading: false};
      break;

      case ActionTypes.SET_THEME:
        state = {...state, theme: action.payload};
        break;

    default:
      break;
  }
  return state;
};

export default AppReducer;