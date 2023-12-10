import React from "react";
import styled from "styled-components";

const TimeInputContainer = styled.div`
      padding: 5px;
      span {
        font-size: 13px;
        padding-right: 5px;
        font-weight: bold;
      }
      input {
        display: inline-block;
        width: 3em;
        background-color: #dcdedd;
        font-family: 'Orbitron', sans-serif;
        color: #4f635d;
        border: 2px;
        border-style: solid;
        border-color: #848a88;
        border-radius: 5px;
      }
      
      label {
        display: inline-block;
        width: 6em;
        font-weight: bold;
        font-size: 10px;
      }
    `;

const TimeInput = ({ label, duration, onTimeChange }) => {
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const numericValue = value === '' ? 0 : parseInt(value, 10);
        onTimeChange({ ...duration, [name]: isNaN(numericValue) ? 0 : numericValue });
    };
    
    


    return (
      <TimeInputContainer>
        <span>{label}</span>
        <label>
            Hours
            <input
                type="number"
                min="0"
                max="24"
                name="hours"
                value={duration.hours}
                onChange={handleInputChange}
                />
        </label>
        
        <label>
            Minutes
    
        <input
          type="number"
          min="0"
          max="59"
          name="minutes"
          value={duration.minutes}
          onChange={handleInputChange}
        />
        </label>
        <label>
            Seconds
            <input
          type="number"
          min="0"
          max="59"
          name="seconds"
          value={duration.seconds}
          onChange={handleInputChange}
        />
        </label>
       
        
      </TimeInputContainer>
    );
  };


export default TimeInput;