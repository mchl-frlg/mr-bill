import { CREATE_USER, CLEAR_USER, FETCH_USER } from '../actions';


const UserReducer = function (state = {}, action) {
  switch (action.type) {
    case CREATE_USER:
      debugger;
      return action.payload.data
    case FETCH_USER:
      return action.payload.data
    case CLEAR_USER:
      return false
    default:
      return state;
  }
};

export default UserReducer;