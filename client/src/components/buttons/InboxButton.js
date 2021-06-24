import { Inbox, InboxFill } from 'react-bootstrap-icons';

const InboxButton = ({ showBills }) => {
  return (
    <h1>
      <span title="your bills">{showBills ? <InboxFill /> : <Inbox />}</span>
    </h1>
  );
};

export default InboxButton;
