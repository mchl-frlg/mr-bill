import React, { useState } from "react";
import Switch from "react-switch";


const SwitchButton = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  }

  return (
      <Switch onChange={handleChange} onColor={'#CC5500'} checked={checked} />
  );
}

export default SwitchButton