import React, { useState, useEffect } from 'react';
import { useTimerContext } from './TimerContext';
import TimeInput from "./generic/TimeInput";
import Input from "./generic/Input";
import { useParams } from "react-router-dom";

const EditTimer = () => {
  const { timerId } = useParams();
  const { timers, updateTimer } = useTimerContext();

  const timerToEdit = timers.find(timer => timer.id === Number(timerId));

  // TODO: Add error if timer not found and redirect to home page

  const [timerType, setTimerType] = useState(timerToEdit.type);
  const [duration, setDuration] = useState(timerToEdit.duration);
  const [restTime, setRestTime] = useState(timerToEdit.restTime);
  const [numRounds, setNumRounds] = useState(timerToEdit.numRounds);

  const handleUpdateTimer = () => {
    const updatedTimer = {
      id: Number(timerId),
      type: timerType,
      duration: duration,
      restTime: restTime,
      numRounds,
    };

    updateTimer(updatedTimer);
  };

  useEffect(() => {
    setTimerType(timerToEdit.type);
    setDuration(timerToEdit.duration);
    setRestTime(timerToEdit.restTime);
    setNumRounds(timerToEdit.numRounds);
  }, [timerToEdit]);

  return (
    <div>
      <h2>Edit Timer</h2>
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

      <button onClick={handleUpdateTimer}>Update Timer</button>
    </div>
  );
};

export default EditTimer;