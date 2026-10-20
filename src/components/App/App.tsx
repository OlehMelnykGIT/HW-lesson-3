// =====================================================================
// App — головний компонент. Сторінка побудована як навчальний матеріал:
// кожна тема — окремий <LessonSection> з поясненням і живим демо.
//
//   1. Компоненти, пропси, useState, умовний рендеринг  (кав'ярня)
//   2. Прості форми: <form action> + FormData           (OrderForm)
//   3. Складні форми: useId, radio, checkbox, select    (OrderFormClient)
//   4. HTTP-запити: axios, async/await, loader, помилки (SearchForm)
//   5. useEffect і масив залежностей                   (Effects)
//   6. useEffect + HTTP-запит при зміні стану           (Login → SWAPI)
//   7. useEffect з очищенням (cleanup)                  (Timer)
//   8. Лінива ініціалізація стану + localStorage        (LocalStorageApp)
//   9. Модальне вікно: createPortal, children, Escape   (Modal)
// =====================================================================
import css from './App.module.css';
import { useState } from 'react';
import { ColorRing } from 'react-loader-spinner';

import LessonSection from '../Lesson/LessonSection';
import CafeInfo from '../CafeInfo/CafeInfo';
import VoteStats from '../VoteStats/VoteStats';
import VoteOptions from '../VoteOptions/VoteOptions';
import Notification from '../Notification/Notification';
import OrderForm from '../forms/Forms';
import OrderFormClient, { type OrderData } from '../forms/OrderForm';
import SearchForm from '../forms/SearchForm';
import ArticleList from '../forms/ArticleList';
import Login from '../forms/Login/Login';
import Timer from '../forms/Login/Timer';
import Effects from '../Effects';
import LocalStorageApp from '../LocalStorage';
import Modal from '../Modal/Modal';

import { fetchArticles } from '../services/articleService';
import type { Votes, VoteType } from '../../types/votes';
import type { Article } from '../../types/article';

// Зміст сторінки — з нього будується навігація вгорі
const TOPICS = [
  { id: 'state', title: 'Компоненти, пропси та useState' },
  { id: 'simple-form', title: 'Проста форма: action + FormData' },
  { id: 'order-form', title: 'Складна форма: useId, radio, checkbox, select' },
  { id: 'http', title: 'HTTP-запити: axios, loader, помилки' },
  { id: 'effects', title: 'useEffect і масив залежностей' },
  { id: 'effect-fetch', title: 'useEffect + запит при зміні стану' },
  { id: 'cleanup', title: 'useEffect з очищенням (cleanup)' },
  { id: 'local-storage', title: 'Лінива ініціалізація + localStorage' },
  { id: 'modal', title: 'Модальне вікно: портал і children' },
];

export default function App() {
  // ---------- 1. Голосування (стан піднятий у App) ----------
  const [votes, setVotes] = useState<Votes>({ good: 0, neutral: 0, bad: 0 });

  const resetVotes = () => setVotes({ good: 0, neutral: 0, bad: 0 });
  // Функціональне оновлення: беремо попередній стан і змінюємо одне поле
  const handleVote = (type: VoteType) =>
    setVotes(prevVotes => ({ ...prevVotes, [type]: prevVotes[type] + 1 }));

  // Похідні значення — обчислюються з стану, окремий useState не потрібен
  const totalVotes = votes.good + votes.neutral + votes.bad;
  const positiveRate =
    totalVotes > 0 ? Math.round((votes.good / totalVotes) * 100) : 0;

  // ---------- 2. Проста форма ----------
  const [orderedBy, setOrderedBy] = useState<string | null>(null);

  const handleOrder = (username: string) => {
    console.log('Order received from:', username);
    setOrderedBy(username);
  };

  // ---------- 3. Складна форма ----------
  const [clientOrder, setClientOrder] = useState<OrderData | null>(null);

  // ---------- 4. Пошук статей (HTTP) ----------
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSearch = async (topic: string) => {
    try {
      setIsLoading(true); // показуємо лоадер
      setIsError(false); // скидаємо попередню помилку
      const data = await fetchArticles(topic);
      setArticles(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false); // ховаємо лоадер у будь-якому разі
    }
  };

  // ---------- 7. Таймер (монтування / розмонтування) ----------
  const [isTimerOpen, setIsTimerOpen] = useState(false);

  // ---------- 9. Модальне вікно ----------
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.intro}>
        <h1 className={css.pageTitle}>
          React: урок 3 — конспект із прикладами
        </h1>
        <p className={css.lead}>
          Кожен розділ нижче — окрема тема: пояснення, ключові поняття, шлях до
          файлу з кодом і живе демо, з яким можна взаємодіяти. Деякі приклади
          пишуть у консоль — відкрий DevTools (<kbd>F12</kbd> → Console), щоб
          бачити, що відбувається.
        </p>
        <nav>
          <ol className={css.toc}>
            {TOPICS.map(topic => (
              <li key={topic.id}>
                <a href={`#${topic.id}`}>{topic.title}</a>
              </li>
            ))}
          </ol>
        </nav>
      </header>

      {/* ============ 1. Компоненти, пропси, useState ============ */}
      <LessonSection
        id="state"
        number={1}
        title="Компоненти, пропси та useState"
        concepts={[
          'useState',
          'props',
          'підняття стану',
          'похідні значення',
          'умовний рендеринг',
          'CSS Modules',
        ]}
        files={[
          'App/App.tsx',
          'CafeInfo/CafeInfo.tsx',
          'VoteOptions/VoteOptions.tsx',
          'VoteStats/VoteStats.tsx',
          'Notification/Notification.tsx',
          'types/votes.ts',
        ]}
        description={
          <>
            <p>
              Стан голосів <code>votes</code> зберігається в <code>App</code> і
              передається дочірнім компонентам через пропси. Кнопки (
              <code>VoteOptions</code>) не знають, де лежить стан — вони лише
              викликають колбеки <code>onVote</code> та <code>onReset</code>.
            </p>
            <p>
              <code>totalVotes</code> і <code>positiveRate</code> — похідні
              значення: обчислюються з <code>votes</code> при кожному рендері.
              Поки голосів немає, замість статистики показується{' '}
              <code>Notification</code> (тернарний оператор), а кнопка Reset
              з'являється лише коли <code>canReset === true</code> (оператор{' '}
              <code>&amp;&amp;</code>).
            </p>
          </>
        }
        code={`const [votes, setVotes] = useState<Votes>({ good: 0, neutral: 0, bad: 0 });

const handleVote = (type: VoteType) =>
  setVotes(prev => ({ ...prev, [type]: prev[type] + 1 }));

const totalVotes = votes.good + votes.neutral + votes.bad;

{totalVotes > 0 ? <VoteStats ... /> : <Notification />}`}
        tip="Натисни будь-яку кнопку — «No feedback yet» зміниться на статистику, а поруч з'явиться Reset."
      >
        <CafeInfo />
        <VoteOptions
          onVote={handleVote}
          onReset={resetVotes}
          canReset={totalVotes > 0}
        />
        {totalVotes > 0 ? (
          <VoteStats
            votes={votes}
            totalVotes={totalVotes}
            positiveRate={positiveRate}
          />
        ) : (
          <Notification />
        )}
      </LessonSection>

      {/* ============ 2. Проста форма ============ */}
      <LessonSection
        id="simple-form"
        number={2}
        title="Проста форма: action + FormData"
        concepts={['<form action>', 'FormData', 'formData.get()', 'валідація']}
        files={['forms/Forms.tsx']}
        description={
          <>
            <p>
              У React 19 у <code>&lt;form&gt;</code> можна передати функцію в
              атрибут <code>action</code>. Під час сабміту React сам викликає її
              з об'єктом <code>FormData</code> і очищає форму —{' '}
              <code>preventDefault</code> та <code>useState</code> для полів не
              потрібні.
            </p>
            <p>
              Значення читаємо за атрибутом <code>name</code>:{' '}
              <code>formData.get('username')</code>. Якщо поле порожнє —
              показуємо <code>alert</code> і нічого не відправляємо.
            </p>
          </>
        }
        code={`const handleSubmit = (formData: FormData) => {
  const username = formData.get('username') as string;
  if (username.trim() === '') return alert('Please enter your name!');
  onSubmit(username);
};

<form action={handleSubmit}>
  <input type="text" name="username" />
  <button type="submit">Place order</button>
</form>`}
        tip="Спробуй відправити порожню форму, а потім — з іменем."
      >
        <OrderForm onSubmit={handleOrder} />
        {orderedBy && (
          <p className={css.result}>
            ✅ Замовлення прийнято від: <strong>{orderedBy}</strong>
          </p>
        )}
      </LessonSection>

      {/* ============ 3. Складна форма ============ */}
      <LessonSection
        id="order-form"
        number={3}
        title="Складна форма: useId, radio, checkbox, select"
        concepts={[
          'useId',
          'htmlFor',
          'fieldset / legend',
          'radio + defaultChecked',
          'checkbox + getAll()',
          'select + defaultValue',
        ]}
        files={['forms/OrderForm.tsx', 'forms/OrderForms.module.css']}
        description={
          <>
            <p>
              <code>useId()</code> генерує унікальний id для компонента, щоб
              пов'язати <code>&lt;label htmlFor&gt;</code> з{' '}
              <code>&lt;input id&gt;</code>. Навіть якщо форма буде на сторінці
              двічі, id не повторяться.
            </p>
            <p>
              Радіокнопки з однаковим <code>name</code> дають одне значення (
              <code>get</code>), а чекбокси — масив усіх відмічених (
              <code>getAll</code>). <code>defaultChecked</code> і{' '}
              <code>defaultValue</code> задають початкові значення
              неконтрольованих полів.
            </p>
          </>
        }
        code={`const fieldId = useId();

<label htmlFor={\`\${fieldId}-email\`}>Email</label>
<input type="email" name="email" id={\`\${fieldId}-email\`} />

const orderData = {
  delivery: formData.get('delivery') as string,          // radio
  restrictions: formData.getAll('restrictions') as string[], // checkbox
};`}
        tip="Заповни форму, відміть кілька чекбоксів і натисни Place order — нижче з'явиться об'єкт, зібраний з FormData."
      >
        <OrderFormClient onSubmit={setClientOrder} />
        {clientOrder && (
          <pre className={css.json}>{JSON.stringify(clientOrder, null, 2)}</pre>
        )}
      </LessonSection>

      {/* ============ 4. HTTP-запити ============ */}
      <LessonSection
        id="http"
        number={4}
        title="HTTP-запити: axios, loader, помилки"
        concepts={[
          'axios.get<T>()',
          'async / await',
          'try / catch / finally',
          'isLoading',
          'isError',
          'react-loader-spinner',
          'map + key',
        ]}
        files={[
          'services/articleService.ts',
          'forms/SearchForm.tsx',
          'forms/ArticleList.tsx',
          'types/article.ts',
        ]}
        description={
          <>
            <p>
              Запит винесено в окремий сервіс <code>fetchArticles</code> —
              компонент не знає про URL і axios, він лише отримує масив статей.
              Тип відповіді задаємо дженериком{' '}
              <code>axios.get&lt;ArticlesHttpResponse&gt;</code>.
            </p>
            <p>
              Під час запиту зберігаємо три стани: <code>isLoading</code>{' '}
              (показати спінер), <code>isError</code> (показати помилку) і самі
              дані <code>articles</code>. Блок <code>finally</code> гарантує, що
              лоадер зникне і при успіху, і при помилці. Список рендеримо через{' '}
              <code>map</code> з унікальним <code>key</code>.
            </p>
          </>
        }
        code={`const handleSearch = async (topic: string) => {
  try {
    setIsLoading(true);
    setIsError(false);
    setArticles(await fetchArticles(topic));
  } catch {
    setIsError(true);
  } finally {
    setIsLoading(false);
  }
};`}
        tip={
          <>
            Введи, наприклад, <code>react</code> і натисни Search. Дані
            приходять з Hacker News API.
          </>
        }
      >
        <SearchForm onSubmit={handleSearch} />
        {isLoading && (
          <ColorRing
            visible={true}
            height="40"
            width="40"
            ariaLabel="color-ring-loading"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        )}
        {isError && <p>Whoops, something went wrong! Please try again!</p>}
        {articles.length > 0 && <ArticleList items={articles} />}
      </LessonSection>

      {/* ============ 5. useEffect і залежності ============ */}
      <LessonSection
        id="effects"
        number={5}
        title="useEffect і масив залежностей"
        concepts={['useEffect', '[deps]', '[a]', '[a, b]', 'StrictMode']}
        files={['Effects.tsx']}
        description={
          <>
            <p>
              <code>useEffect(fn, deps)</code> запускає <code>fn</code> після
              рендеру, але лише тоді, коли змінилось щось із масиву залежностей.
              Тут три ефекти: перший реагує тільки на <code>first</code>, другий
              — тільки на <code>second</code>, третій — на будь-який з них.
            </p>
            <p>
              Під час першого рендеру спрацьовують усі ефекти. У режимі розробки{' '}
              <code>StrictMode</code> монтує компонент двічі, тому в консолі на
              старті ти побачиш повтори — це нормально.
            </p>
          </>
        }
        code={`useEffect(() => console.log('First updated:', first), [first]);
useEffect(() => console.log('Second updated:', second), [second]);
useEffect(() => console.log('First or second:', first + second), [first, second]);`}
        tip="Відкрий консоль і натискай кнопки по черзі — подивись, які саме повідомлення з'являються."
      >
        <Effects />
      </LessonSection>

      {/* ============ 6. useEffect + HTTP ============ */}
      <LessonSection
        id="effect-fetch"
        number={6}
        title="useEffect + запит при зміні стану"
        concepts={[
          'useEffect',
          'async-функція всередині ефекту',
          'axios',
          '[count]',
        ]}
        files={['forms/Login/Login.tsx']}
        description={
          <>
            <p>
              Функцію ефекту не можна зробити <code>async</code> (вона має
              повертати лише функцію очищення). Тому всередині оголошуємо окрему
              асинхронну функцію і одразу її викликаємо.
            </p>
            <p>
              Ефект залежить від <code>count</code>: щойно лічильник змінюється
              — йде новий запит за наступним персонажем Star Wars.
            </p>
          </>
        }
        code={`useEffect(() => {
  async function fetchCharacter() {
    const response = await axios.get(\`https://swapi.info/api/people/\${count}\`);
    setPerson(response.data);
  }
  fetchCharacter();
}, [count]);`}
        tip="Натисни «Get next character» — count збільшиться, і ефект завантажить нового персонажа."
      >
        <Login />
      </LessonSection>

      {/* ============ 7. Cleanup ============ */}
      <LessonSection
        id="cleanup"
        number={7}
        title="useEffect з очищенням (cleanup)"
        concepts={[
          'useEffect(..., [])',
          'setInterval',
          'clearInterval',
          'return () => {}',
        ]}
        files={['forms/Login/Timer.tsx']}
        description={
          <>
            <p>
              Порожній масив <code>[]</code> означає: виконати ефект один раз
              при монтуванні. Ефект запускає <code>setInterval</code>, що
              щосекунди оновлює час.
            </p>
            <p>
              Функція, яку повертає ефект, — це <b>очищення</b>. React викличе
              її при розмонтуванні компонента. Без <code>clearInterval</code>{' '}
              інтервал продовжив би працювати навіть після того, як таймер зник
              зі сторінки (витік пам'яті).
            </p>
          </>
        }
        code={`useEffect(() => {
  const intervalId = setInterval(() => setTime(new Date()), 1000);
  return () => clearInterval(intervalId); // cleanup
}, []);`}
        tip="Відкрий консоль, покажи таймер — побачиш «Interval - …» щосекунди. Сховай його — повідомлення припиняться."
      >
        <button onClick={() => setIsTimerOpen(!isTimerOpen)}>
          {isTimerOpen ? 'Hide timer' : 'Show timer'}
        </button>
        {isTimerOpen && <Timer />}
      </LessonSection>

      {/* ============ 8. localStorage ============ */}
      <LessonSection
        id="local-storage"
        number={8}
        title="Лінива ініціалізація стану + localStorage"
        concepts={[
          'useState(() => ...)',
          'localStorage.getItem / setItem',
          'JSON.parse / stringify',
          'useEffect([clicks])',
        ]}
        files={['LocalStorage.tsx']}
        description={
          <>
            <p>
              Якщо передати в <code>useState</code> функцію, React викличе її
              лише один раз — при першому рендері (лінива ініціалізація). Там ми
              читаємо збережене значення з <code>localStorage</code>.
            </p>
            <p>
              Ефект з залежністю <code>[clicks]</code> зберігає нове значення
              щоразу, коли воно змінюється. У сховищі лежать лише рядки, тому
              використовуємо <code>JSON.stringify</code> /{' '}
              <code>JSON.parse</code>.
            </p>
          </>
        }
        code={`const [clicks, setClicks] = useState(() => {
  const saved = localStorage.getItem('saved-clicks');
  return saved !== null ? JSON.parse(saved) : 0;
});

useEffect(() => {
  localStorage.setItem('saved-clicks', JSON.stringify(clicks));
}, [clicks]);`}
        tip="Поклацай кнопку і онови сторінку (F5) — лічильник збережеться."
      >
        <LocalStorageApp />
      </LessonSection>

      {/* ============ 9. Модальне вікно ============ */}
      <LessonSection
        id="modal"
        number={9}
        title="Модальне вікно: портал і children"
        concepts={[
          'createPortal',
          'children',
          'event.target vs currentTarget',
          'addEventListener("keydown")',
          'cleanup',
          'body overflow',
        ]}
        files={['Modal/Modal.tsx', 'Modal/Modal.module.css']}
        description={
          <>
            <p>
              <code>createPortal</code> рендерить модалку прямо в{' '}
              <code>document.body</code>, поза деревом <code>App</code> — так її
              не обріжуть батьківські стилі (<code>overflow</code>,{' '}
              <code>z-index</code>). Вміст модалки передаємо через{' '}
              <code>children</code>, тож один компонент підходить для будь-якого
              контенту.
            </p>
            <p>
              Закрити можна трьома способами: хрестиком, кліком по фону (
              <code>event.target === event.currentTarget</code>) або клавішею{' '}
              <code>Escape</code>. Слухач клавіатури додається в ефекті й
              видаляється в cleanup, як і блокування прокрутки сторінки.
            </p>
          </>
        }
        code={`{isModalOpen && (
  <Modal onClose={closeModal}>
    <h2>Modal Title</h2>
    <p>This is some content inside the modal.</p>
  </Modal>
)}

return createPortal(<div className={css.backdrop}>...</div>, document.body);`}
        tip="Відкрий модалку і спробуй усі три способи закриття. Поки вона відкрита, сторінка не прокручується."
      >
        <button onClick={openModal}>Open modal</button>
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <h2>Modal Title</h2>
            <p>This is some content inside the modal.</p>
          </Modal>
        )}
      </LessonSection>
    </div>
  );
}
