import { useState } from 'react';
import { Bell, BellFill } from 'react-bootstrap-icons';

const BellButton = ({ onClick, showBills }) => {
  const [hover, setHover] = useState(false);
  return (
    <h1
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span title="notifications">{showBills ? <Bell /> : <BellFill />}</span>
    </h1>
  );
};

export default BellButton;