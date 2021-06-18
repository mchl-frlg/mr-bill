import React, { useState } from "react";
import Switch from "react-switch";
import { useSelector, useDispatch } from 'react-redux';
import { updateBill } from '../../actions'


const SwitchButton = ({ bill, user }) => {
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();

  const handleChange = () => {
    setChecked(!checked);
    console.log('handling switch, sir!')
    const billToUpdate = {
      user: user, 
      bill: bill, 
      billStatus: true
    }
    dispatch(updateBill(billToUpdate))
  }

  const handleSwitch = () => {
    
  }

  return (
      <Switch onChange={handleChange} onColor={'#CC5500'} checked={checked} />
  );
}

export default SwitchButton