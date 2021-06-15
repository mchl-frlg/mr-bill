import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import CloseButton from '../buttons/CloseButton'


function SignInModal() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const onClose = () => {
    setShow(false);
  };

  return (
    <>
      <p onClick={() => setShow(true)}>Sign In</p>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header>
          <Modal.Title>Sign In With Google</Modal.Title>
          <CloseButton onClose={onClose} />
        </Modal.Header>
          <Modal.Body>
            <p>Sign in with google</p>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Modal.Footer>
      </Modal>
    </>
  );
}

export default SignInModal;