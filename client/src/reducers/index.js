import { combineReducers } from 'redux';
import UserReducer from './user-reducer';

const rootReducer = combineReducers({
  activeUser: UserReducer
});

export default rootReducer;
