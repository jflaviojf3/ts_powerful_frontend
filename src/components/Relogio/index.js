import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";

function Clock({ isRunning, minutos} ) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval;
    if (isRunning) {
      let valorInicialSeg = minutos;
      interval = setInterval(() => {
        setTime((prevTime) => {
          prevTime = valorInicialSeg;
          valorInicialSeg = prevTime + 1;
          return (prevTime);
        });
      }, 1000);
    } else {
      clearInterval(interval);
      setTime(0);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  const formatTime = (seconds) => {
    const hours = Math.floor((seconds / 3600) / 1000).toFixed(0)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${remainingSeconds}`;
  };

  return (
    <>
      <Typography variant="h4" >
        {formatTime(time)}
      </Typography>
    </>
  );
}

export default Clock;
