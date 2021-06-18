import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CloseButton from './buttons/CloseButton';
import Moment from 'react-moment';
import { Redirect, Route, Switch, useHistory, Link } from 'react-router-dom';
import { updateUser, deleteUser } from '../actions'

function Settings() {

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const activeUser = useSelector(state => state.activeUser)

  const settingsChange = (timeInput) => {
    dispatch(updateUser({
      time: timeInput,
      user: activeUser._id
    }));
    setShow(false);
  };

  const handleDelete = () => {
    dispatch(deleteUser(activeUser._id))
    setShow(false);
  }

  const onClose = () => {
    setShow(false);
  };

  const times = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

  return (
    <>
      <Link onClick={() => setShow(true)} className='nav-links'>Settings</Link>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header>
          <Modal.Title>Edit Company</Modal.Title>
          <CloseButton onClose={onClose} />
        </Modal.Header>
          <Modal.Body>
            <h3>Notifications</h3>
            <label>Time</label>
            <select onChange={event=> {settingsChange(event.target.value)}}>
              {times.map(time=>{
                return(
                  <option key={time} value={time}>
                    {time}
                  </option>
                )
              })}
            </select>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleDelete} type="submit" variant="danger">
              Delete Account
            </Button>
          </Modal.Footer>
      </Modal>
    </>
  );
}

export default Settings;