import ActionTypes from "../actionTypes/actionTypes";

const showAlert = payload => {
  return {
    type: ActionTypes.SHOW_ALERT,
    payload,
  };
};

const hideAlert = () => {
  return {
    type: ActionTypes.HIDE_ALERT,
  };
};

const showLoading = () => {
  return {
    type: ActionTypes.SHOW_LOADING,
  };
};

const hideLoading = () => {
  return {
    type: ActionTypes.HIDE_LOADING,
  };
};

const setTheme = payload => {
    return {
      type: ActionTypes.SET_THEME,
      payload,
    };
  };

export { showLoading, hideLoading, showAlert, hideAlert, setTheme };