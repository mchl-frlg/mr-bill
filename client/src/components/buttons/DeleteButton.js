import { useState } from 'react';
import Switch from "react-switch";
import { Modal, Button, Form, OverlayTrigger, Popover } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment';
import { Redirect, Route, useHistory, Link } from 'react-router-dom';
import { updateUser, deleteUser } from '../../actions'



const DeleteButton = ({setShow}) => {
  
  const dispatch = useDispatch();
  const activeUser = useSelector(state => state.activeUser)
  
  const handleDelete = () => {
    dispatch(deleteUser(activeUser._id))
    setShow(false);
  }

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Delete Account</Popover.Title>
      <Popover.Content>
        I understand this will <strong>permanently</strong> delete my data
        <br/>
        <Button onClick={handleDelete} type="submit" variant="danger">
          Confirm
        </Button>
      </Popover.Content>
    </Popover>
  );


  return (
    <> 
    <OverlayTrigger trigger="click" placement="right" overlay={popover}>
      <Button type="submit" variant="danger">
        Delete Account
      </Button>
      </OverlayTrigger>
    </>
  )
}

export default DeleteButton