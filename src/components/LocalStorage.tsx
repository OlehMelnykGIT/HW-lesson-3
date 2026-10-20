// LocalStorageApp — стан, що переживає перезавантаження сторінки.
import { useState, useEffect } from 'react';

export default function LocalStorageApp() {
  // Лінива ініціалізація: функція виконається лише при першому рендері
  const [clicks, setClicks] = useState<number>(() => {
    const savedClicks = localStorage.getItem('saved-clicks');
    if (savedClicks !== null) {
      return JSON.parse(savedClicks);
    }
    return 0;
  });

  // Зберігаємо нове значення щоразу, коли змінюється clicks
  useEffect(() => {
    localStorage.setItem('saved-clicks', JSON.stringify(clicks));
  }, [clicks]);

  return (
    <div>
      <button onClick={() => setClicks(clicks + 1)}>
        You clicked {clicks} times
      </button>
      <button onClick={() => setClicks(0)}>Reset</button>
    </div>
  );
}
