import { useState, useEffect } from "react";
interface counterType {
  totalNumbers: number;
  correctNumbers: number;
}
const Timer = ({
  startTypeCheck,
  setStartTypeCheck,
  setInputDisabled,
  setText,
  setCounter,
  seconds,
  setSeconds,
  minutes,
  setMinutes,
}: {
  startTypeCheck: boolean;
  setStartTypeCheck: (value: boolean) => void;
  setInputDisabled: (value: boolean) => void;
  setText: (value: string) => void;
  setCounter: (value: counterType) => void;
  seconds: number;
  setSeconds: (value: number) => void;
  minutes: number;
  setMinutes: (value: number) => void;
}) => {
  useEffect(() => {
    let timer: number;
    if (startTypeCheck) {
      timer = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setStartTypeCheck(false);
          setInputDisabled(true);
          setMinutes(1);
          setText("");
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [startTypeCheck, seconds, minutes]);

  return <>{`0${minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`}</>;
};

export default Timer;
