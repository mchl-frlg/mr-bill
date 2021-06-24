import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux';
import { clearUser } from '../../actions/index'

const Logout = () => {
  const [removeCookie] = useCookies(['mr-bill-auth']);
  const dispatch = useDispatch();
  const onSuccess = googleData => {
    removeCookie('mr-bill-auth')
    dispatch(clearUser())
  }

  return (
    <GoogleLogout
    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
    buttonText="Logout"
    onLogoutSuccess={onSuccess}
    //cookiePolicy={'single_host_origin'}
/>
  )
}

export default Logout