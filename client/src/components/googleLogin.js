import React from 'react';
import { GoogleLogin } from 'react-google-login';


const googleLogin = ({setLoggedIn}) => {


  const handleLogin = async googleData => {
    debugger;
    const res = await fetch("http://localhost:8000/create-new-account", {
        method: "POST",
        body: JSON.stringify({
        token: googleData
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()
    debugger;
    setLoggedIn(true)
      
  }

  return (
    <>
    <GoogleLogin
    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
    buttonText="Authorize Account"
    onSuccess={handleLogin}
    onFailure={handleLogin}
    cookiePolicy='single_host_origin'
    scope="https://www.googleapis.com/auth/gmail.readonly"
    accessType="offline"
    responseType="code"
/>
  </>
  )
}

export default googleLogin