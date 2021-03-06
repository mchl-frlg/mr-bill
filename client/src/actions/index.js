import axios from 'axios';

export const CREATE_USER = "CREATE_USER";
export const FETCH_USER = "FETCH_USER";
export const CLEAR_USER = "CLEAR_USER";

export function createUser(authCode) {
  return axios
    .post(`/create-new-account`, authCode)
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
    .post(`/fetch-user`, cookie)
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
    .post(`/login-user`, authCode)
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

export function updateBill(billObj) {
  return axios
    .put(`/update-bill`, billObj)
    .then((response) => ({
      type: FETCH_USER,
      payload: response,
    }))
    .catch(err => {
      console.error(err)
    });
}

export function updateUser(userObj) {
  return axios
    .put(`/update-user`, userObj)
    .then((response) => ({
      type: FETCH_USER,
      payload: response,
    }))
    .catch(err => {
      console.error(err)
    });
}

export function deleteUser(userId) {
  return axios
    .delete(`/delete-user/${userId}`)
    .then((response) => ({
      type: FETCH_USER,
      payload: response,
    }))
    .catch(err => {
      console.error(err)
    });
}

export function deleteBill(userId, billId) {
  return axios
    .delete(`/delete-bill/${userId}/${billId}`)
    .then((response) => ({
      type: FETCH_USER,
      payload: response,
    }))
    .catch(err => {
      console.error(err)
    });
}