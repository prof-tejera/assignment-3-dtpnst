import React from "react";
import { useEffect, useState } from "react";
import Panel from "../generic/Panel";
import Timer from "../generic/Timer";
import { useTimerContext } from "../TimerContext";

const Tabata = (timer) => {
    const { currentTimerId, isWorkoutRunning, fastForward, isRestart } = useTimerContext();
    const [currentTime, setCurrentTime] = useState(0); 
    const [workTime] = useState(timer.duration);
    const [restTime] = useState(timer.restTime);
    const [numRounds] = useState(timer.numRounds);
    const [currentRound, setCurrentRound] = useState(0);
    const [isRest, setIsRest] = useState(false);


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
      }, [timer, isWorkoutRunning, currentTimerId, fastForward, currentTime, workTime, restTime, currentRound, numRounds, isRest]);

    useEffect(() => {
      if(isRestart) {
        setCurrentTime(0);
        setCurrentRound(0)
        setIsRest(false);
      }
    }, [isRestart])

    return (
        <Panel>
            <Timer
                currentTime={currentTime}
                currentRound={currentRound}
            />
        </Panel>
    );
};

export default Tabata;
