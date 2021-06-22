import { useState } from 'react';
import { Inbox, InboxFill } from 'react-bootstrap-icons';

const InboxButton = ({ onClose, showBills }) => {
  const [xHover, setXHover] = useState(false);
  return (
    <h1
      onClick={onClose}
      onMouseEnter={() => setXHover(true)}
      onMouseLeave={() => setXHover(false)}
    >
      <span title="your bills">{showBills ? <InboxFill /> : <Inbox />}</span>
    </h1>
  );
};

export default InboxButton;
