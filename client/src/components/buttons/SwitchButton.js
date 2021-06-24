import React, { useState } from "react";
import Switch from "react-switch";
import { useDispatch } from 'react-redux';
import { updateBill } from '../../actions'


const SwitchButton = ({ bill, user, billStatus, paid, displayOnly }) => {
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();

  const handleChange = () => {
    setChecked(!checked);
    console.log('handling switch, sir!')
    const billToUpdate = {
      user: user, 
      bill: bill, 
      billStatus: billStatus,
      paid: paid
    }
    dispatch(updateBill(billToUpdate))
  }

  return (
      <Switch onChange={displayOnly ? null : handleChange} onColor={'#CC5500'} checked={displayOnly ? paid : checked} />
  );
}

export default SwitchButton