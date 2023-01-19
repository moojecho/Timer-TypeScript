import React, { useState, useEffect, useRef } from "react";

function App() {
  const minutesRef = useRef<HTMLInputElement>(null);
  const secondsRef = useRef<HTMLInputElement>(null);
  const [startToggle, setStartToggle] = useState<boolean>(false);
  const [stopToggle, setStopToggle] = useState<boolean>(false);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  console.log(secondsRef.current?.value);


  function useInterval(callback: ()=>void, delay:number) {
    const savedCallback = useRef<(() => void) | null>();
  
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    useEffect(() => {
      function tick() {
        if(savedCallback.current){
          savedCallback.current();
        }
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }



  const changeMinutes = () => {
    if (startToggle === false) {
      if (secondsRef.current) {
        setSeconds(Number(secondsRef.current.value));
      }
      setStartToggle(true);
      console.log(startToggle);
    }
  };

  const stopTimer = () => {
    setStopToggle(!stopToggle);
    setStartToggle(!startToggle);
  };

  useInterval(()=>{
    setSeconds(seconds+1);
    console.log(seconds);
  },1000);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     if (stopToggle || seconds===0) {
  //     console.log(stopToggle);
  //     setStartToggle(false);
  //     clearInterval(timer);
  //   }
  //     if (startToggle) {
  //       setSeconds(value => value - 1);
  //       console.log(seconds);
  //     }
      
  //   }, 1000);
  //   return () => clearInterval(timer);
  // }, [startToggle, stopToggle]);

  return (
    <div className="App">
      <div style={{ display: "flex" }}>
        <input type="number" ref={minutesRef} />
        <p>minutes</p>
        <input type="number" ref={secondsRef} />
        <p>seconds</p>
        <button onClick={changeMinutes}>Start</button>
        <button onClick={stopTimer}>Pause/restart</button>
        <button>Reset</button>
      </div>
      <h1>00:00</h1>
    </div>
  );
}

export default App;
