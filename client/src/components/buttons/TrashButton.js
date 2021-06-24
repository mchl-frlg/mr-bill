import { useState } from 'react';
import { Trash, TrashFill } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { deleteBill } from '../../actions'

const TrashButton = ({ userId, billId }) => {
  const [hover, setHover] = useState(false);
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteBill(userId, billId))
  }

  return (
    <h5
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={()=> {handleDelete()}}
    >
      <span title="delete bill">{hover ? <TrashFill /> : <Trash />}</span>
    </h5>
  );
};

export default TrashButton;