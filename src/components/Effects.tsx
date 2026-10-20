// Effects — як масив залежностей керує тим, коли запускається useEffect.
// Результат дивись у консолі браузера.
import { useState, useEffect } from 'react';

export default function Effects() {
  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(0);

  // Спрацьовує лише коли змінюється first
  useEffect(() => {
    console.log('First updated:', first);
  }, [first]);

  // Спрацьовує лише коли змінюється second
  useEffect(() => {
    console.log('Second updated:', second);
  }, [second]);

  // Спрацьовує, коли змінюється будь-яке з двох значень
  useEffect(() => {
    console.log('First or second updated:', first + second);
  }, [first, second]);

  return (
    <>
      <button onClick={() => setFirst(first + 1)}>First: {first}</button>
      <button onClick={() => setSecond(second + 1)}>Second: {second}</button>
    </>
  );
}
