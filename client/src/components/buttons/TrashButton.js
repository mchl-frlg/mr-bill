import { useState } from 'react';
import { Trash, TrashFill } from 'react-bootstrap-icons';

const TrashButton = ({ onClick }) => {
  const [hover, setHover] = useState(false);
  return (
    <h5
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span title="delete bill">{hover ? <TrashFill /> : <Trash />}</span>
    </h5>
  );
};

export default TrashButton;