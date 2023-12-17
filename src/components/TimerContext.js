import React, { createContext, useContext, useEffect, useState } from "react";

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {

  const storedState = JSON.parse(localStorage.getItem('runningState'));
  const storedTimers = JSON.parse(localStorage.getItem('timers'));

  const [timers, setTimers] = useState(storedTimers ?? []);
  const [currentTimerId, setCurrentTimerId] = useState(storedState?.currentTimerId ?? null);
  const [currentIndex, setCurrentIndex] = useState(storedState?.currentIndex ?? 0);
  const [isWorkoutRunning, setIsWorkoutRunning] = useState(storedState?.isWorkoutRunning ?? false);
  const [isRestart, setIsRestart] = useState(storedState?.isRestart ?? false);
  const [currentTime, setCurrentTime] = useState(storedState?.currentTime ?? 0);
  const [currentRound, setCurrentRound] = useState(storedState?.currentRound ?? 0);
  const [isRest, setIsRest] = useState(storedState?.isRest ?? false);

  const addTimer = timer => {
    setTimers(prevTimers => {
      const updatedTimers = [...prevTimers, timer];
      localStorage.setItem('timers', JSON.stringify(updatedTimers));
      return updatedTimers;
    });
    if(currentTimerId === null && timers.length === 0) {
      setCurrentTimerId(timer.id);
    }
  }
  const removeTimer = timerId => {
    if(currentTimerId === timerId) {
      fastForward();
    }
    setTimers(prevTimers => {
      const updatedTimers = prevTimers.filter(timer => timer.id !== timerId);
      localStorage.setItem('timers', JSON.stringify(updatedTimers));
      return updatedTimers;
    });

  }
  const fastForward = () => {
    if(currentIndex === timers.length - 1) {
      restart();
    } else {
      setCurrentTimerId(timers[currentIndex+1].id);
      if(timers[currentIndex+1].type === 'Countdown') {
        setCurrentTime(timers[currentIndex+1].duration);
      } else {
        setCurrentTime(0);
      }
      setCurrentIndex(prevIndex => prevIndex + 1);
      setCurrentRound(0);
      setIsRest(true);
    }
  }
  const restart = () => {
    setCurrentIndex(0);
    setCurrentTimerId(timers[0].id);
    setIsWorkoutRunning(false);
    setIsRestart(true);
    setCurrentTime(0);
    setCurrentRound(0);
    setIsRest(true);
  }
  const startStop = () => {
    setIsRestart(false);
    setIsWorkoutRunning(!isWorkoutRunning);
  }

  useEffect(() => {
      const intervalId = setInterval(() => {
        localStorage.setItem('runningState', JSON.stringify({
          currentTimerId,
          currentIndex,
          isWorkoutRunning,
          isRestart,
          currentTime,
          currentRound,
          isRest,
        }));
      }, 500);

      return () => clearInterval(intervalId);

  }, [currentTimerId, currentIndex, isWorkoutRunning, isRestart, currentTime, currentRound, isRest]);

  return (
    <TimerContext.Provider value={{ timers, currentTimerId, currentIndex, isWorkoutRunning, isRestart, addTimer, removeTimer, fastForward, restart, startStop, currentTime, setCurrentTime, currentRound, setCurrentRound, isRest, setIsRest }}>
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