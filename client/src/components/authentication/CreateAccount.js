import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { createUser } from '../../actions/index'



const GoogleCreateAccount = () => {

  const dispatch = useDispatch()

  const handleLogin = googleData => {
    dispatch(createUser(googleData))
  }

  return (
    <>
      <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText="Sign Up"
      onSuccess={handleLogin}
      onFailure={handleLogin}
      //cookiePolicy='single_host_origin'
      scope="https://www.googleapis.com/auth/gmail.modify"
      accessType="offline"
      responseType="code"
    />
  </>
  )
}

export default GoogleCreateAccount