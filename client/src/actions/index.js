import axios from 'axios';

export const CREATE_USER = "CREATE_USER";
export const FETCH_USER = "FETCH_USER";
export const CLEAR_USER = "CLEAR_USER";

export function createUser(authCode) {
  debugger;
  return axios
    .post(`http://localhost:8000/create-new-account`, authCode)
    .then((response) => ({
      type: CREATE_USER,
      payload: response,
    }))
    .catch(err => {
      console.error(err)
    });
}

export function fetchUser(authCode) {
  debugger;
  return axios
    .post(`http://localhost:8000/fetch-user`, authCode)
    .then((response) => ({
      type: FETCH_USER,
      payload: response,
    }))
    .catch(err => {
      console.error(err)
    });
}

export function clearUser() {
  debugger;
  return {
      type: CLEAR_USER,
      payload: {},
    }
}