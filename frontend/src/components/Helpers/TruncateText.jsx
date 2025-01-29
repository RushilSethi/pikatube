import { useState } from 'react';
import PropTypes from 'prop-types';

const TruncateText = ({ text, length }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const truncatedText = isExpanded ? text : text.substring(0, length) + (text.length > length ? '...' : '');

  return (
    <>
      {truncatedText}
      {text.length > length && ( 
        <span 
          className="text-blue-500 cursor-pointer" 
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? ' Read Less' : ` Read More`}
        </span>
      )}
    </>
  );
};

TruncateText.propTypes = {
  text: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired,
};

export default TruncateText;