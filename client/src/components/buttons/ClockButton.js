import { useState } from 'react';
import { Clock, ClockFill } from 'react-bootstrap-icons';

const ClockButton = ({ onClose }) => {
  const [xHover, setXHover] = useState(false);
  return (
    <h1
      onClick={onClose}
      onMouseEnter={() => setXHover(true)}
      onMouseLeave={() => setXHover(false)}
    >
      <span title="recents">{xHover ? <ClockFill /> : <Clock />}</span>
    </h1>
  );
};

export default ClockButton;
