import React from "react";
import Duration from "../generic/Duration";

const DisplayTime = ({ value }) => {
    return (
      <div className="display">
        {new Duration(  Math.floor(value / 60), value % 60).formatDuration()}
      </div>
    );
  };
  
  export default DisplayTime;
  