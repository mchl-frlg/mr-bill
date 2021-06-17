import axios from 'axios';

export const CREATE_USER = "CREATE_USER";
export const FETCH_USER = "FETCH_USER";
export const CLEAR_USER = "CLEAR_USER";

export function createUser(authCode) {
  return axios
    .post(`http://localhost:8000/create-new-account`, authCode)
    .then((response) => {
      return {
        type: CREATE_USER,
        payload: response,
      }
    })
    .catch(err => {
      console.error(err)
    });
}

export function fetchUser(cookie) {
  return axios
    .post(`http://localhost:8000/fetch-user`, cookie)
    .then((response) => ({
      type: FETCH_USER,
      payload: response,
    }))
    .catch(err => {
      console.error(err)
    });
}

export function loginUser(authCode) {
  return axios
    .post(`http://localhost:8000/login-user`, authCode)
    .then((response) => ({
      type: FETCH_USER,
      payload: response,
    }))
    .catch(err => {
      console.error(err)
    });
}

export function clearUser() {
  return {
      type: CLEAR_USER,
      payload: {},
    }
}