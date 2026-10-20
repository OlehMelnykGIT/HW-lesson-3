// Notification — показується, поки немає жодного голосу.
import css from './Notification.module.css';

export default function Notification() {
  return <p className={css.message}>No feedback yet</p>;
}
