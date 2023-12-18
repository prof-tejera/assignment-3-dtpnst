import React, { useState } from 'react';
import { useTimerContext } from './TimerContext';
import TimeInput from "./generic/TimeInput";
import Input from "./generic/Input";

const AddTimer = () => {
  const { addTimer } = useTimerContext();

  const [timerType, setTimerType] = useState('Stopwatch');
  const [duration, setDuration] = useState( 0);
  const [restTime, setRestTime] = useState( 0);
  const [numRounds, setNumRounds] = useState( 0);
  const [description, setDescription] = useState('');

  const handleAddTimer = () => {

      const newTimer = {
        id: new Date().getTime(),
        type: timerType,
        duration: duration,
        restTime: restTime,
        numRounds,
        description
      };
      console.log(newTimer);
      addTimer(newTimer);
      setDuration(0);
      setRestTime(0);
      setNumRounds(0);
      setDescription('');

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

      <Input label="Description" type="text" onChange={(e) => setDescription(e.target.value)} />

      {/* Additional properties based on timer type */}
      {timerType === 'Stopwatch' && (
        <TimeInput label="Time" durationSeconds={duration} onTimeChange={(newTime) => setDuration(newTime)} />
      )}
      {timerType === 'Countdown' && (
        <TimeInput label="Time" durationSeconds={duration} onTimeChange={(newTime) => setDuration(newTime)} />
      )}
      {timerType === 'XY' && (
        <>
          <TimeInput label="Time Per Round" durationSeconds={duration} onTimeChange={(newTime) => setDuration(newTime)} />
          <Input label="# of Rounds" type="number" min="0" onChange={(e) => setNumRounds(e.target.value)} />
        </>
      )}
      {timerType === 'Tabata' && (
        <>
          <TimeInput label="Work Time" durationSeconds={duration} onTimeChange={(newTime) => setDuration(newTime)} />
          <TimeInput label="Rest Time" durationSeconds={restTime} onTimeChange={(newTime) => setRestTime(newTime)} />
          <Input label="# of Rounds" type="number" min="0" onChange={(e) => setNumRounds(e.target.value)} />
        </>
      )}

      <button onClick={handleAddTimer}>Add Timer</button>
    </div>
  );
};

export default AddTimer;