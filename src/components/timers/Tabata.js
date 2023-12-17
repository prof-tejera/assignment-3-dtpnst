import React from "react";
import { useEffect, useState } from "react";
import Panel from "../generic/Panel";
import Timer from "../generic/Timer";
import { useTimerContext } from "../TimerContext";

const Tabata = (timer) => {
    const { currentTimerId, isWorkoutRunning, fastForward, isRestart, currentTime, setCurrentTime, currentRound, setCurrentRound, isRest, setIsRest } = useTimerContext();
    const [workTime] = useState(timer.duration);
    const [restTime] = useState(timer.restTime);
    const [numRounds] = useState(timer.numRounds);


    useEffect(() => {
        let timerInterval;
        if (isWorkoutRunning && currentTimerId === timer.id) {
          if (currentTime > 0) {
            timerInterval = setInterval(() => {
              setCurrentTime((prevTime) => prevTime - 1);
            }, 1000);
          } else if (currentRound < numRounds) {
            if (isRest) {
              setCurrentTime(workTime);
              setCurrentRound((currentRound) => currentRound + 1);
              setIsRest(false);
            } else {
              setCurrentTime(restTime);
              setIsRest(true);
            }
          } else if (currentRound === numRounds && !isRest) {
            setCurrentTime(restTime);
            setIsRest(true);
          } else {
            fastForward();
          }
        } else {
          clearInterval(timerInterval);
        }
      
        return () => clearInterval(timerInterval);
      }, [timer, isWorkoutRunning, currentTimerId, fastForward, currentTime, workTime, restTime, currentRound, numRounds, isRest, setCurrentTime, setCurrentRound, setIsRest]);

    useEffect(() => {
      if(isRestart) {
        setCurrentTime(0);
        setCurrentRound(0)
        setIsRest(false);
      }
    }, [isRestart, setCurrentRound, setCurrentTime, setIsRest])

    return (
        <Panel>
            <Timer
              currentTime={currentTimerId === timer.id ? currentTime : 0}
              currentRound={currentTimerId === timer.id ? currentRound : 0}
            />
        </Panel>
    );
};

export default Tabata;
