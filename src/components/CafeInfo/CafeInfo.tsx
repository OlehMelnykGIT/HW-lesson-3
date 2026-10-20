// CafeInfo — простий презентаційний компонент без пропсів і стану.
import css from './CafeInfo.module.css';

export default function CafeInfo() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Sip Happens Café</h1>
      <p className={css.description}>
        Please rate our service by selecting one of the options below.
      </p>
    </div>
  );
}
