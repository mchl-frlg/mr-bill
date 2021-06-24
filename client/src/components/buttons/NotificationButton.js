import { Bell, BellFill } from 'react-bootstrap-icons';

const BellButton = ({ onClick, showBills }) => {
  return (
    <h1>
      <span title="notifications">{showBills ? <Bell /> : <BellFill />}</span>
    </h1>
  );
};

export default BellButton;