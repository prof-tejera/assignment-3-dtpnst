import React from "react";
import styled from "styled-components";
import Stopwatch from "../components/timers/Stopwatch";
import Countdown from "../components/timers/Countdown";
import XY from "../components/timers/XY";
import Tabata from "../components/timers/Tabata";
import { useTimerContext } from "../components/TimerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward, faPause, faPlay, faRotateLeft, faXmark, faPenToSquare, faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { formatDuration } from "../utils/helpers";

const Timers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Timer = styled.div`
  border: 1px solid gray;
  padding: 20px;
  margin: 10px;
  font-size: 1.5rem;
`;

const TimerTitle = styled.div``;


const buttonStyle = {
  backgroundColor: "#fcba03",
  color: "white",
  borderRadius: "8px",
  padding: "5px 10px",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.3)",
  border: "5px",
  borderStyle: "solid",
  borderColor: "#bf8f0a",
};

const resetButtonStyle = {
  backgroundColor: "#d9311e",
  color: "white",
  borderRadius: "8px",
  padding: "5px 10px",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.3)",
  border: "5px",
  borderStyle: "solid",
  borderColor: "#ba3425",
};

const removeButtonStyle = {
  backgroundColor: "#d9311e",
  color: "white",
  borderRadius: "8px",
  padding: "5px 10px",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.3)",
  border: "5px",
  borderStyle: "solid",
  borderColor: "#ba3425",
  position: "relative",
  display: "flex",
  left: "215px",
  top: "-40px",
};

const buttonContainerStyle = {
  paddingLeft: "16px",
}

const TimersView = () => {
  const navigate = useNavigate();
  const { timers, currentTimerId, startStop, fastForward, removeTimer, isWorkoutRunning, restart, moveTimerUp, moveTimerDown, totalTime } = useTimerContext();

  const handleStartStopClick = () => {
    startStop();
  }

  const handleResetClick = () => {
    restart();
  }

  const handleFastForwardClick = () => {
    fastForward();
  }

  const handleRemoveTimer = (timerId) => {
    removeTimer(timerId);
  }

  const handleEditTimer = (timerId) => {
    navigate(`/edit/${timerId}`);
  }

  const handleMoveTimerUp = (timerId) => {
    moveTimerUp(timerId);
  }

  const handleMoveTimerDown = (timerId) => {
    moveTimerDown(timerId);
  }

  return (
    <Timers>
      <div>Total Workout Time: {formatDuration(totalTime)}</div>
      <div style={buttonContainerStyle}>
        <FontAwesomeIcon icon={isWorkoutRunning ? faPause : faPlay} style={buttonStyle} onClick={handleStartStopClick}/>
        <FontAwesomeIcon icon={faRotateLeft} style={resetButtonStyle} onClick={handleResetClick}/>
        <FontAwesomeIcon icon={faForward} style={buttonStyle} onClick={handleFastForwardClick} />
      </div>
      {timers.map((timer, index) => (
        <Timer key={timer.id} className={(timer.id === currentTimerId) ? 'runningTimer' : 'notRunningTimer'}>
          <TimerTitle>{timer.description}</TimerTitle>
          <FontAwesomeIcon icon={faPenToSquare} style={buttonStyle} onClick={() => handleEditTimer(timer.id)} />
          <FontAwesomeIcon icon={faAngleUp} style={buttonStyle} onClick={() => handleMoveTimerUp(timer.id)} />
          <FontAwesomeIcon icon={faAngleDown} style={buttonStyle} onClick={() => handleMoveTimerDown(timer.id)} />
          <FontAwesomeIcon icon={faXmark} style={removeButtonStyle} onClick={() => handleRemoveTimer(timer.id)} />
          {timer.type === "Countdown" && (
            <Countdown
              id={timer.id}
              duration={timer.duration}
            />
          )}
          {timer.type === "Stopwatch" && (
            <Stopwatch
              id={timer.id}
              duration={timer.duration}
            />
          )}
          {timer.type === "Tabata" && (
            <Tabata
              id={timer.id}
              duration={timer.duration}
              restTime={timer.restTime}
              numRounds={timer.numRounds}
            />
          )}
          {timer.type === "XY" && (
            <XY
              id={timer.id}
              duration={timer.duration}
              numRounds={timer.numRounds}
            />
          )}
        </Timer>
      ))}
    </Timers>
  );
};

export default TimersView;