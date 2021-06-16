import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../../actions/index'
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import CloseButton from '../buttons/CloseButton'


const Login = () => {
  const [show, setShow] = useState(false);
  const onClose = () => {
    setShow(false);
  };
  const dispatch = useDispatch()
  const handleLogin = googleData => {
    debugger;
    dispatch(fetchUser(googleData))
  }

  return (
    <>
      <p onClick={() => setShow(true)}>Sign In</p>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header>
          <Modal.Title>Sign In</Modal.Title>
          <CloseButton onClose={onClose} />
        </Modal.Header>
          <Modal.Body>
            <p>Sign in with google</p>
          </Modal.Body>
          <Modal.Footer>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Sign In"
              onSuccess={handleLogin}
              onFailure={handleLogin}
              cookiePolicy='single_host_origin'
              scope="https://www.googleapis.com/auth/gmail.modify"
            />
          </Modal.Footer>
      </Modal>
    </>
  );
}

export default Login;