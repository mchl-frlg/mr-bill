import { useState } from 'react';
import Switch from "react-switch";
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CloseButton from './buttons/CloseButton';
import DeleteButton from './buttons/DeleteButton'
import { Link } from 'react-router-dom';
import { updateUser} from '../actions'

function Settings() {

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  
  
  const activeUser = useSelector(state => state.activeUser)
  const [email, setEmail] = useState(activeUser.notifications.email);
  const [text, setText] = useState(activeUser.notifications.text);
  const [form, setForm] = useState({phone: activeUser.phone, time: activeUser.scan.batchScanTime});

  const handleForm = (event) => {
    setForm({...form, ...event})
    console.log(form)
  }

  const settingsChange = () => {
    dispatch(updateUser({
      user: activeUser._id, 
      text: text, 
      email: email, 
      ...form
    }));
    setShow(false);
  };

  

  const onClose = () => {
    setShow(false);
  };

  const times = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

  return (
    <>
      <Link onClick={() => setShow(true)} className='nav-links'>Settings</Link>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header>
          <Modal.Title>Settings</Modal.Title>
          <CloseButton onClose={onClose} />
        </Modal.Header>
          <Modal.Body>
              <Form>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Notification Time</Form.Label>
                  <Form.Control as="select" defaultValue={activeUser.scan.batchScanTime} onChange={event=>{handleForm({time: event.target.value})}}>
                    {times.map(time=>{
                      return(
                        <option key={time} value={time} >
                          {time}
                        </option>
                      )
                    })}
                  </Form.Control>
                </Form.Group>
                  <Form.Group controlId="formBasicCheckbox">
                  <Form.Label>Email Notifications</Form.Label>
                  <br/>
                    <Switch onChange={()=>{setEmail(!email)}} checked={email} onColor={'#CC5500'}/>
                  </Form.Group>
                  <Form.Group controlId="formBasicCheckbox">
                  <Form.Label>Text Notifications</Form.Label>
                  <br/>
                    <Switch onChange={()=>{setText(!text)}} checked={text} onColor={'#CC5500'}/>
                  </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="text" onChange={event=> {handleForm({phone: event.target.value})}} placeholder={activeUser.phone}/>
                </Form.Group>
              </Form>
          </Modal.Body>
          <Modal.Footer>
            <DeleteButton setShow={setShow}/>
            <Button onClick={settingsChange} type="submit" variant="primary">
              Submit
            </Button>
          </Modal.Footer>
      </Modal>
    </>
  );
}

export default Settings;