import React from "react";
import Duration from "../generic/Duration";

const DisplayTime = ({ value }) => {
    return (
      <div className="display">
        {new Duration(value / 3600, (value % 3600) / 60, value % 60).formatDuration()}
      </div>
    );
  };
  
  export default DisplayTime;
  