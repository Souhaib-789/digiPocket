import ActionTypes from "../actionTypes/actionTypes";

const userExist = payload => {
  return {
    type: ActionTypes.USER_EXIST,
    payload,
  };
};

const userInfo = payload => {
    return {
      type: ActionTypes.USER_INFO,
      payload,
    };
  };

  const Logout = () => {
    return {
      type: ActionTypes.LOGOUT,
    };
  };



export { userExist , userInfo, Logout };