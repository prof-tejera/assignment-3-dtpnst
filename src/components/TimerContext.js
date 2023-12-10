import React, { createContext, useContext, useState } from "react";

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [timers, setTimers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTimerId, setCurrentTimerId] = useState(null);
  const [isWorkoutRunning, setIsWorkoutRunning] = useState(false);
  const [isRestart, setIsRestart] = useState(false);

  const addTimer = timer => {
    setTimers(prevTimers => [...prevTimers, timer]);
    if(currentTimerId === null && timers.length === 0) {
      setCurrentTimerId(timer.id);
    }
  }
  const removeTimer = timerId => {
    if(currentTimerId === timerId) {
      fastForward();
    }
    setTimers(prevTimers => prevTimers.filter(timer => timer.id !== timerId));

  }
  const fastForward = () => {
    if(currentIndex === timers.length - 1) {
      restart();
    } else {
      setCurrentTimerId(timers[currentIndex+1].id);
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  }
  const restart = () => {
    setCurrentIndex(0);
    setCurrentTimerId(timers[0].id);
    setIsWorkoutRunning(false);
    setIsRestart(true);
  }
  const startStop = () => {
    setIsRestart(false);
    setIsWorkoutRunning(!isWorkoutRunning);
  }


  return (
    <TimerContext.Provider value={{ timers, currentTimerId, currentIndex, isWorkoutRunning, isRestart, addTimer, removeTimer, fastForward, restart, startStop }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimerContext = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimerContext must be used within a TimerProvider');
  }
  return context;
};