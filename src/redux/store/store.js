import { createStore, combineReducers} from 'redux';
 import AppReducer from '../reducers/AppReducer';
 import AuthReducer from '../reducers/AuthReducer';

const rootReducer = combineReducers({
  AppReducer,
  AuthReducer
});
 
export const store = createStore(rootReducer);