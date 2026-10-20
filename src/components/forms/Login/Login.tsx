// Login — useEffect, що робить HTTP-запит щоразу, коли змінюється count.
// (Назва історична: насправді це завантаження персонажів Star Wars зі SWAPI.)
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Character {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
  gender: string;
}

export default function Login() {
  const [count, setCount] = useState(1);
  const [person, setPerson] = useState<Character | null>(null);

  useEffect(() => {
    // 1. Оголошуємо асинхронну функцію
    //    (саму функцію ефекту робити async не можна)
    async function fetchCharacter() {
      const response = await axios.get<Character>(
        `https://swapi.info/api/people/${count}`,
      );
      setPerson(response.data);
    }

    // 2. Викликаємо її одразу після оголошення
    fetchCharacter();
  }, [count]); // ефект перезапускається при кожній зміні count

  return (
    <>
      <h3>The count is {count}</h3>
      <button onClick={() => setCount(count + 1)}>Get next character</button>
      {person && (
        <p>
          <strong>{person.name}</strong> — birth year: {person.birth_year},
          height: {person.height} cm, gender: {person.gender}
        </p>
      )}
      <details>
        <summary>Повна відповідь API (JSON)</summary>
        <pre>{JSON.stringify(person, null, 2)}</pre>
      </details>
    </>
  );
}
