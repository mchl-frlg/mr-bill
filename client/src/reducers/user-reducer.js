import { CREATE_USER, CLEAR_USER } from '../actions';

const UserReducer = function (state = {}, action) {
  switch (action.type) {
    case CREATE_USER:
      return action.payload.data
    case CLEAR_USER:
      return false
    default:
      return state;
  }
};

export default UserReducer;