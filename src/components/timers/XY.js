import React from "react";
import { useEffect, useState } from "react";
import Panel from "../generic/Panel";
import Timer from "../generic/Timer";
import { useTimerContext } from "../TimerContext";

const XY = (timer) => {
    const { currentTimerId, isWorkoutRunning, fastForward, isRestart } = useTimerContext();
    const [currentTime, setCurrentTime] = useState(0); 
    const [countdownAmount] = useState(timer.duration);
    const [numRounds] = useState(timer.numRounds);
    const [currentRound, setCurrentRound] = useState(0);


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
    }, [timer, isWorkoutRunning, currentTimerId, fastForward, currentTime, countdownAmount, currentRound, numRounds]);

    useEffect(() => {
        if(isRestart) {
            setCurrentTime(0);
            setCurrentRound(0)
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

export default XY;
