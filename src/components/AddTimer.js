import React, { useState } from 'react';
import { useTimerContext } from './TimerContext';
import TimeInput from "./generic/TimeInput";
import Input from "./generic/Input";
import {  useLocation } from 'react-router-dom';

const AddTimer = () => {
  const { addTimer } = useTimerContext();
  //const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [timerType, setTimerType] = useState(params.get('timerType') ?? 'Stopwatch');
  const [duration, setDuration] = useState(params.get('duration') ?? 0);
  const [restTime, setRestTime] = useState(params.get('restTime') ?? 0);
  const [numRounds, setNumRounds] = useState(params.get('numRounds') ?? 0);


  const handleAddTimer = () => {

      const newTimer = {
        id: new Date().getTime(),
        type: timerType,
        duration: duration,
        restTime: restTime,
        numRounds,
      };
      console.log(newTimer);
      addTimer(newTimer);
      setDuration(0);
      setRestTime(0);
      setNumRounds(0);
/*
    const query = new URLSearchParams({
      timerType,
      duration: duration,
      restTime: restTime,
      numRounds,
    }).toString();

    navigate(`${location.pathname}?${query}`);
*/
  };

  return (
    <div>
      <h2>Add Timer</h2>
      <label>
        Timer Type:
        <select value={timerType} onChange={(e) => setTimerType(e.target.value)}>
          <option value="Stopwatch">Stopwatch</option>
          <option value="Countdown">Countdown</option>
          <option value="XY">XY</option>
          <option value="Tabata">Tabata</option>
        </select>
      </label>

      {/* Additional properties based on timer type */}
      {timerType === 'Stopwatch' && (
        <TimeInput label="Time" duration={duration} onTimeChange={(newTime) => setDuration(newTime)} />
      )}
      {timerType === 'Countdown' && (
        <TimeInput label="Time" duration={duration} onTimeChange={(newTime) => setDuration(newTime)} />
      )}
      {timerType === 'XY' && (
        <>
          <TimeInput label="Time Per Round" duration={duration} onTimeChange={(newTime) => setDuration(newTime)} />
          <Input label="# of Rounds" type="number" min="0" onChange={(e) => setNumRounds(e.target.value)} />
        </>
      )}
      {timerType === 'Tabata' && (
        <>
          <TimeInput label="Work Time" duration={duration} onTimeChange={(newTime) => setDuration(newTime)} />
          <TimeInput label="Rest Time" duration={restTime} onTimeChange={(newTime) => setRestTime(newTime)} />
          <Input label="# of Rounds" type="number" min="0" onChange={(e) => setNumRounds(e.target.value)} />
        </>
      )}

      <button onClick={handleAddTimer}>Add Timer</button>
    </div>
  );
};

export default AddTimer;