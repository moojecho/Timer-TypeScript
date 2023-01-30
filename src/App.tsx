import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

function App() {
  const minutesRef = useRef<HTMLInputElement>(null);
  const secondsRef = useRef<HTMLInputElement>(null);
  const [startToggle, setStartToggle] = useState<boolean>(false);
  const [stopToggle, setStopToggle] = useState<boolean>(false);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  const useInterval = (callback: () => void, delay: number) => {
    const savedCallback = useRef<(() => void) | null>();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        if (savedCallback.current) {
          savedCallback.current();
        }
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        if ((!seconds && !minutes) || stopToggle) {
          clearInterval(id);
        }
        return () => clearInterval(id);
      }
    }, [delay, startToggle, stopToggle]);
  };
  //start button 기능
  const startTimer = () => {
    if (!startToggle && !stopToggle) {
      if (secondsRef.current || minutesRef.current) {
        setSeconds(Number(secondsRef.current?.value));
        setMinutes(Number(minutesRef.current?.value));
      }
      setStartToggle(true);
    }
  };

  //stop button 기능
  const stopTimer = () => {
    if (seconds || minutes) {
      setStopToggle(!stopToggle);
      setStartToggle(!startToggle);
    }
  };

  //reset button 기능
  const resetTimer = () => {
    setStopToggle(false);
    setStartToggle(false);
    setSeconds(0);
    setMinutes(0);
  };

  //useInterval 사용 -> timer 기능
  useInterval(() => {
    if (startToggle) {
      setSeconds(seconds - 1);
      if (!seconds && minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else if (!seconds && !minutes) {
        resetTimer();
      }
    }
  }, 1000);

  return (
    <Layout className="App">
      <TimerLayout>
        <InputLayout style={{ display: "flex" }}>
          <InputDesign type="number" ref={minutesRef} placeholder={"minutes"} />
          <InputDesign type="number" ref={secondsRef} placeholder={"seconds"} />
        </InputLayout>
        <ButtonLayout>
          <ButtonDesign onClick={startTimer}>Start</ButtonDesign>
          <ButtonDesign onClick={stopTimer}>Pause/restart</ButtonDesign>
          <ButtonDesign onClick={resetTimer}>Reset</ButtonDesign>
        </ButtonLayout>
        <TimerDesign>
          {startToggle || stopToggle
            ? `${
                Math.floor(minutes / 10) === 0 ? `0${minutes}` : `${minutes}`
              }:${
                Math.floor(seconds / 10) === 0 ? `0${seconds}` : `${seconds}`
              }`
            : "00:00"}
        </TimerDesign>
      </TimerLayout>
    </Layout>
  );
}

export default App;
const Layout = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TimerLayout = styled.div`
  width: 25vw;
  min-width: 350px;
  min-height: 350px;
  height: 25vw;
  border: none;
  border-radius: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #3178c6;
`;

const InputLayout = styled.div`
  width: 22vw;
  margin-top: 30px;
`;

const InputDesign = styled.input`
  width: 8vw;
  height: 3vw;
  border: none;
  border-radius: 20vw;
  margin: auto;
  padding-left: 10px;
`;

const ButtonLayout = styled.div`
  width: 20vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

const ButtonDesign = styled.button`
  width: 5vw;
  height: 2vw;
  border: none;
  border-radius: 4px;
  margin: auto;
  overflow: hidden;
  text-align: center;
`;

const TimerDesign = styled.p`
  font-size: 50px;
  font-weight: bold;
`;
