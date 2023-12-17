import React, { createContext, useContext, useEffect, useState } from "react";

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [timers, setTimers] = useState([]);
  const storedState = JSON.parse(localStorage.getItem('runningState'));

  const [currentTimerId, setCurrentTimerId] = useState(storedState?.currentTimerId ?? null);
  const [currentIndex, setCurrentIndex] = useState(storedState?.currentIndex ?? 0);
  const [isWorkoutRunning, setIsWorkoutRunning] = useState(storedState?.isWorkoutRunning ?? false);
  const [isRestart, setIsRestart] = useState(storedState?.isRestart ?? false);


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

  useEffect(() => {
    if (isWorkoutRunning) {
      const intervalId = setInterval(() => {
        localStorage.setItem('runningState', JSON.stringify({
          currentTimerId,
          currentIndex,
          isWorkoutRunning,
          isRestart,
        }));
      }, 2000);

      return () => clearInterval(intervalId);
    }
  }, [currentTimerId, currentIndex, isWorkoutRunning, isRestart]);

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