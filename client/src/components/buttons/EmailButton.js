import { useState } from 'react';
import { Envelope, EnvelopeOpenFill } from 'react-bootstrap-icons';

const EmailButton = ({ onClose }) => {
  const [xHover, setXHover] = useState(false);
  return (
    <h3
      onClick={onClose}
      onMouseEnter={() => setXHover(true)}
      onMouseLeave={() => setXHover(false)}
    >
      <span title="view bill">{xHover ? <EnvelopeOpenFill /> : <Envelope />}</span>
    </h3>
  );
};

export default EmailButton;
