import React from "react";
import { useEffect, useState } from "react";
import Panel from "../generic/Panel";
import Timer from "../generic/Timer";
import { useTimerContext } from "../TimerContext";

const XY = (timer) => {
    const { currentTimerId, isWorkoutRunning, fastForward, isRestart, currentTime, setCurrentTime, currentRound, setCurrentRound } = useTimerContext();
    const [countdownAmount] = useState(timer.duration);
    const [numRounds] = useState(timer.numRounds);


    useEffect(() => {
        let timerInterval;
        if (isWorkoutRunning && currentTimerId === timer.id) {
            if (currentTime > 0) {
                timerInterval = setInterval(() => {
                    setCurrentTime((prevTime) => prevTime - 1);
                }, 1000);
            } else if (currentRound < numRounds) {
                setCurrentTime(countdownAmount);
                setCurrentRound((currentRound) => currentRound + 1);
            } else {
                fastForward();
            }
        } else {
            clearInterval(timerInterval);
        }

        return () => clearInterval(timerInterval);
    }, [timer, isWorkoutRunning, currentTimerId, fastForward, currentTime, countdownAmount, currentRound, numRounds, setCurrentRound, setCurrentTime]);

    useEffect(() => {
        if(isRestart) {
            setCurrentTime(0);
            setCurrentRound(0)
        }
    }, [isRestart, setCurrentTime, setCurrentRound])

    return (
        <Panel>
            <Timer
              currentTime={currentTimerId === timer.id ? currentTime : 0}
              currentRound={currentTimerId === timer.id ? currentRound : 0}
            />
        </Panel>
    );
};

export default XY;
