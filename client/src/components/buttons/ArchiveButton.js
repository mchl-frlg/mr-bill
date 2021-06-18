import { useState } from 'react';
import { Safe, SafeFill } from 'react-bootstrap-icons';

const ArchiveButton = ({ onClick }) => {
  const [archiveHover, setArchiveHover] = useState(false);
  return (
    <h1
      onClick={onClick}
      onMouseEnter={() => setArchiveHover(true)}
      onMouseLeave={() => setArchiveHover(false)}
    >
      <span title="viewing full archive">{archiveHover ? <SafeFill /> : <Safe />}</span>
    </h1>
  );
};

export default ArchiveButton;