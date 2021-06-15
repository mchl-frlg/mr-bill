import React from 'react';
import { GoogleLogout } from 'react-google-login';


const Logout = () => {
  const onSuccess = googleData => {
    console.log('logged out successfully');
  }

  return (
    <GoogleLogout
    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
    buttonText="Log in with Google"
    onLogoutSuccess={onSuccess}
    cookiePolicy={'single_host_origin'}
/>
  )
}

export default Logout