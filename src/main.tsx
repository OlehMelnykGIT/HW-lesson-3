// src/main.tsx — точка входу: монтуємо <App /> у <div id="root"> з index.html
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'modern-normalize';
import App from './components/App/App';

// StrictMode у режимі розробки виконує додаткові перевірки коду
// (наприклад, двічі запускає ефекти, щоб виявити відсутній cleanup)
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
