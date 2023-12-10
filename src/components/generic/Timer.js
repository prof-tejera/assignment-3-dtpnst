import React from 'react';
import Panel from '../generic/Panel';
import DisplayTime from '../generic/DisplayTime';
import DisplayRound from '../generic/DisplayRound';
import styled from "styled-components";

const TimerContainer = styled.div`
    background-color: #4f635d;
    width: 175px;
    padding: 20px;
    padding-bottom: 50px;
    border: 20px;
    border-style: solid;
    border-color: #fcba03;
    border-top-right-radius: 30px;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 100px;
    border-bottom-right-radius: 100px;
`;


const Timer = ({
  currentTime,
  currentRound,
}) => {

  

  return (
    <Panel>
        <TimerContainer>
            <DisplayTime value={currentTime} />
        </TimerContainer>
        {currentRound !== undefined && <DisplayRound value={currentRound} />}
    </Panel>
  );
};

export default Timer;