// LessonSection — "обгортка" для одного розділу навчального матеріалу.
// Сама нічого не вивчає, лише однаково оформлює кожну тему на сторінці:
// заголовок → пояснення → ключові поняття → файли → код → живе демо → підказка.
import css from './LessonSection.module.css';

interface LessonSectionProps {
  id: string; // якір для змісту (#id)
  number: number; // номер розділу
  title: string;
  concepts: string[]; // що саме вивчаємо (хуки, API, прийоми)
  files: string[]; // де лежить код
  description: React.ReactNode; // пояснення "як це працює"
  code?: string; // ключовий фрагмент коду
  tip?: React.ReactNode; // що спробувати на сторінці
  children: React.ReactNode; // живе демо
}

export default function LessonSection({
  id,
  number,
  title,
  concepts,
  files,
  description,
  code,
  tip,
  children,
}: LessonSectionProps) {
  return (
    <section id={id} className={css.section}>
      <header className={css.header}>
        <span className={css.number}>{number}</span>
        <h2 className={css.title}>{title}</h2>
      </header>

      <div className={css.description}>{description}</div>

      <ul className={css.concepts}>
        {concepts.map(concept => (
          <li key={concept} className={css.concept}>
            {concept}
          </li>
        ))}
      </ul>

      <p className={css.files}>
        📁 Файли:{' '}
        {files.map(file => (
          <code key={file} className={css.file}>
            {file}
          </code>
        ))}
      </p>

      {code && (
        <details className={css.codeBlock}>
          <summary>Показати ключовий код</summary>
          <pre>
            <code>{code}</code>
          </pre>
        </details>
      )}

      <div className={css.demo}>
        <span className={css.demoLabel}>Живе демо</span>
        {children}
      </div>

      {tip && <p className={css.tip}>💡 {tip}</p>}
    </section>
  );
}
