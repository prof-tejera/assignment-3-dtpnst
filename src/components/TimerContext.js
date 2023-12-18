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
  const [totalTime, setTotalTime] = useState(storedState?.totalTime ?? 0);

  const addTimer = timer => {
    setTimers(prevTimers => {
      const updatedTimers = [...prevTimers, timer];
      localStorage.setItem('timers', JSON.stringify(updatedTimers));

      if(timer.type === 'XY') {
        setTotalTime(prevTime => prevTime + (timer.duration * timer.numRounds));
      } else if(timer.type === 'Tabata') {
        setTotalTime(prevTime => prevTime + ((timer.duration + timer.restTime) * timer.numRounds));
      } else {
        setTotalTime(prevTime => prevTime + timer.duration);
      }


      return updatedTimers;
    });
    if(currentTimerId === null && timers.length === 0) {
      setCurrentTimerId(timer.id);
    }
  }
  const removeTimer = timerId => {
    if(currentTimerId === timerId && timers.length > 1) {
      fastForward();
      setCurrentIndex(prevIndex => prevIndex - 1);
    }

    const timerToRemove = timers.find(timer => timer.id === timerId);

    if(timerToRemove.type === 'XY') {
      setTotalTime(prevTime => prevTime - (timerToRemove.duration * timerToRemove.numRounds));
    } else if(timerToRemove.type === 'Tabata') {
      setTotalTime(prevTime => prevTime - ((timerToRemove.duration + timerToRemove.restTime) * timerToRemove.numRounds));
    } else {
      setTotalTime(prevTime => prevTime - timerToRemove.duration);
    }

    setTimers(prevTimers => {

      const updatedTimers = prevTimers.filter(timer => timer.id !== timerId);
      localStorage.setItem('timers', JSON.stringify(updatedTimers));

      return updatedTimers;
    });

  }

  const updateTimer = updatedTimer => {
    setTimers(prevTimers => {
      const timerIndex = prevTimers.findIndex(timer => timer.id === updatedTimer.id);
      if (timerIndex === -1) {
        return prevTimers;
      }

      const newTimers = [...prevTimers];
      newTimers[timerIndex] = updatedTimer;

      if(updatedTimer.type === 'XY') {
        const timeDifference =  (updatedTimer.duration * updatedTimer.numRounds) - (prevTimers[timerIndex].duration * prevTimers[timerIndex].numRounds);
        setTotalTime(prevTime => prevTime + timeDifference);
      } else if(updatedTimer.type === 'Tabata') {
        const timeDifference = ((updatedTimer.duration + updatedTimer.restTime) * updatedTimer.numRounds) - ((prevTimers[timerIndex].duration + prevTimers[timerIndex].restTime) * prevTimers[timerIndex].numRounds)
        setTotalTime(prevTime => prevTime + timeDifference);
      } else {
        const timeDifference = updatedTimer.duration - prevTimers[timerIndex].duration;
        setTotalTime(prevTime => prevTime + timeDifference);
      }

      localStorage.setItem('timers', JSON.stringify(newTimers));

      return newTimers;
    });
  };

  const moveTimerUp = timerId => {
    setTimers(prevTimers => {
      const timerIndex = prevTimers.findIndex(timer => timer.id === timerId);
      if (timerIndex <= 0) {
        return prevTimers;
      }

      const newTimers = [...prevTimers];
      [newTimers[timerIndex - 1], newTimers[timerIndex]] = [newTimers[timerIndex], newTimers[timerIndex - 1]];

      localStorage.setItem('timers', JSON.stringify(newTimers));

      if (timerId === currentTimerId) {
        setCurrentIndex(timerIndex - 1);
      }

      return newTimers;
    });
  }

  const moveTimerDown = timerId => {
    setTimers(prevTimers => {
      const timerIndex = prevTimers.findIndex(timer => timer.id === timerId);
      if (timerIndex < 0 || timerIndex === prevTimers.length - 1) {
        return prevTimers;
      }

      const newTimers = [...prevTimers];
      [newTimers[timerIndex + 1], newTimers[timerIndex]] = [newTimers[timerIndex], newTimers[timerIndex + 1]];

      localStorage.setItem('timers', JSON.stringify(newTimers));

      if (timerId === currentTimerId) {
        setCurrentIndex(timerIndex + 1);
      }

      return newTimers;
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

    setIsWorkoutRunning(false);
    setIsRestart(true);
    setCurrentTime(0);
    setCurrentRound(0);
    setIsRest(true);
    restartTotalTime();

    if(timers.length > 0) {
      setCurrentTimerId(timers[0].id);
    } else {
      setCurrentTimerId(null);
    }

  }
  const startStop = () => {
    if(!isWorkoutRunning && timers[currentIndex].type === 'Countdown') {
      setCurrentTime(timers[currentIndex].duration);
    }

    setIsRestart(false);
    setIsWorkoutRunning(!isWorkoutRunning);
  }

  const restartTotalTime = () => {
    const total = timers.reduce((sum, timer) => {
      if (timer.type === 'XY') {
        return sum + (timer.duration * timer.numRounds);
      } else if (timer.type === 'Tabata') {
        return sum + ((timer.duration + timer.restTime) * timer.numRounds);
      } else {
        return sum + timer.duration;
      }
    }, 0);
    setTotalTime(total);
  };

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
          totalTime,
        }));
      }, 500);

      return () => clearInterval(intervalId);

  }, [currentTimerId, currentIndex, isWorkoutRunning, isRestart, currentTime, currentRound, isRest, totalTime]);

  return (
    <TimerContext.Provider value={{ timers, currentTimerId, currentIndex, isWorkoutRunning, isRestart,
      addTimer, removeTimer, fastForward, restart, startStop, currentTime, setCurrentTime, currentRound,
      setCurrentRound, isRest, setIsRest, updateTimer, moveTimerUp, moveTimerDown, totalTime, setTotalTime }}>
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