// Timer — useEffect з очищенням (cleanup).
// [] → ефект запускається один раз при монтуванні,
// повернена функція → викликається при розмонтуванні.
import { useEffect, useState } from 'react';

export default function Timer() {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
      console.log(`Interval - ${Date.now()}`);
    }, 1000);

    // Cleanup: без нього інтервал працював би й після зникнення таймера
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <p>TimerBox - {time.toLocaleTimeString()}</p>;
}
