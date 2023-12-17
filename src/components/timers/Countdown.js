import React from "react";
import { useEffect } from "react";
import Panel from "../generic/Panel";
import Timer from "../generic/Timer";
import { useTimerContext } from "../TimerContext";

const Countdown = (timer) => {
    const { currentTimerId, isWorkoutRunning, fastForward, isRestart, setCurrentTime, currentTime, setTotalTime} = useTimerContext();

    useEffect(() => {
        let timerInterval;
        if (isWorkoutRunning && currentTimerId === timer.id) {
            if (currentTime > 0) {
                timerInterval = setInterval(() => {
                    setCurrentTime((prevTime) => {
                        if (prevTime > 0) {
                            return prevTime - 1;
                        } else {
                            fastForward();
                            return prevTime;
                        }
                    });
                    setTotalTime((prevTotalTime) => {
                        if (prevTotalTime > 0) {
                            return prevTotalTime - 1;
                        } else {
                            return prevTotalTime;
                        }
                    });
                }, 1000);
            } else {
                fastForward();
            }
        } else {
            clearInterval(timerInterval);
        }

        return () => clearInterval(timerInterval);
    }, [timer, isWorkoutRunning, currentTimerId, currentTime, fastForward, setCurrentTime, setTotalTime]);


    useEffect(() => {
        if(isRestart && currentTimerId === timer.id) {
            setCurrentTime(timer.duration);
        }
    }, [isRestart, timer.duration, setCurrentTime, currentTimerId, timer.id])

    return (
      <Panel>
          <Timer
            currentTime={currentTimerId === timer.id ? currentTime : 0}
          />
      </Panel>
    );
};

export default Countdown;
