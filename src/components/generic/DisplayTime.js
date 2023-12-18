import React from "react";
import { formatDuration } from "../../utils/helpers";

const DisplayTime = ({ value }) => {
    return (
      <div className="display">
        {formatDuration(value)}
      </div>
    );
  };
  
  export default DisplayTime;
  