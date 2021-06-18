import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../actions/index'
import { useState } from 'react';


const Login = () => {
  const [show, setShow] = useState(false);
  const onClose = () => {
    setShow(false);
  };
  const dispatch = useDispatch()
  const handleLogin = googleData => {
    debugger;
    dispatch(loginUser(googleData))
  }

  return (
    <>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Sign In"
        onSuccess={handleLogin}
        onFailure={handleLogin}
        //cookiePolicy='single_host_origin'
        scope="https://www.googleapis.com/auth/gmail.modify"
      />
    </>
  );
}

export default Login;