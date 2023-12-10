import React, { useState } from 'react';
import { useTimerContext } from './TimerContext';
import TimeInput from "./generic/TimeInput";
import Input from "./generic/Input";
import Duration from "./generic/Duration";

const AddTimer = () => {
  const { addTimer } = useTimerContext();
  const [timerType, setTimerType] = useState('Stopwatch');
  const [duration, setDuration] = useState(new Duration(0, 0, 0));
  const [restTime, setRestTime] = useState(new Duration(0, 0, 0));
  const [numRounds, setNumRounds] = useState(0);

  const handleAddTimer = () => {

      const newTimer = {
        id: new Date().getTime(),
        type: timerType,
        duration,
        restTime,
        numRounds,
      };
      console.log(newTimer);
      addTimer(newTimer);
      setDuration(new Duration(0, 0, 0));
      setRestTime(new Duration(0, 0, 0));
      setNumRounds(0);

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
        <TimeInput label="Time" duration={duration} onTimeChange={(newTime) => setDuration(new Duration(newTime.hours, newTime.minutes, newTime.seconds))} />
      )}
      {timerType === 'Countdown' && (
        <TimeInput label="Time" duration={duration} onTimeChange={(newTime) => setDuration(new Duration(newTime.hours, newTime.minutes, newTime.seconds))} />
      )}
      {timerType === 'XY' && (
        <>
          <TimeInput label="Time Per Round" duration={duration} onTimeChange={(newTime) => setDuration(new Duration(newTime.hours, newTime.minutes, newTime.seconds))} />
          <Input label="# of Rounds" type="number" min="0" onChange={(e) => setNumRounds(e.target.value)} />
        </>
      )}
      {timerType === 'Tabata' && (
        <>
          <TimeInput label="Work Time" duration={duration} onTimeChange={(newTime) => setDuration(new Duration(newTime.hours, newTime.minutes, newTime.seconds))} />
          <TimeInput label="Rest Time" duration={restTime} onTimeChange={(newTime) => setRestTime(new Duration(newTime.hours, newTime.minutes, newTime.seconds))} />
          <Input label="# of Rounds" type="number" min="0" onChange={(e) => setNumRounds(e.target.value)} />
        </>
      )}

      <button onClick={handleAddTimer}>Add Timer</button>
    </div>
  );
};

export default AddTimer;