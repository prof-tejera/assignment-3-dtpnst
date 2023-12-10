import React from "react";
import { useEffect, useState } from "react";
import Panel from "../generic/Panel";
import Timer from "../generic/Timer";
import { useTimerContext } from "../TimerContext";

const Stopwatch = (timer) => {
    const { currentTimerId, isWorkoutRunning, fastForward, isRestart } = useTimerContext();
    const [currentTime, setCurrentTime] = useState(0);
    const [endTime] = useState(timer.duration);


    useEffect(() => {
        let timerInterval;
        if (isWorkoutRunning && currentTimerId === timer.id) {
          if (currentTime < endTime) {
            timerInterval = setInterval(() => {
              setCurrentTime((prevTime) => prevTime + 1); 
            }, 1000);
          } else {
            fastForward();
          }
        } else {
          clearInterval(timerInterval);
        }
    
        return () => clearInterval(timerInterval);
      }, [timer, isWorkoutRunning, currentTimerId, fastForward, currentTime, endTime]);

    useEffect(() => {
      if(isRestart) {
        setCurrentTime(0);
      }
    }, [isRestart])
    

    return (
        <Panel>
            <Timer
                currentTime={currentTime}
            />
        </Panel>
    );


};

export default Stopwatch;
