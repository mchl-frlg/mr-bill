import React from 'react';
import { GoogleLogin } from 'react-google-login';


const googleLogin = () => {
  const handleLogin = async googleData => {
    const res = await fetch("http://localhost:8000/api/v1/auth/google", {
        method: "POST",
        body: JSON.stringify({
        token: googleData.tokenId
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()
    // store returned user somehow
    debugger;
  }

  return (
    <GoogleLogin
    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
    buttonText="Log in with Google"
    onSuccess={handleLogin}
    onFailure={handleLogin}
    cookiePolicy={'single_host_origin'}
/>
  )
}

export default googleLogin