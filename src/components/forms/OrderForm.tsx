// OrderFormClient — форма з різними типами полів.
// Вивчаємо: useId для зв'язки label ↔ input, radio, checkbox, select
// і збір усіх значень через FormData (get / getAll).
import { useId } from 'react';
import css from './OrderForms.module.css';

export interface OrderData {
  username: string;
  email: string;
  delivery: string;
  deliveryTime: string;
  restrictions: string[];
}

interface OrderFormClientProps {
  // необов'язковий колбек — щоб App міг показати результат на сторінці
  onSubmit?: (data: OrderData) => void;
}

export default function OrderFormClient({ onSubmit }: OrderFormClientProps) {
  // Унікальний префікс id для цього екземпляра форми
  const fieldId = useId();

  const handleOrder = (formData: FormData) => {
    const orderData: OrderData = {
      username: formData.get('username') as string,
      email: formData.get('email') as string,
      delivery: formData.get('delivery') as string,
      deliveryTime: formData.get('deliveryTime') as string,
      // getAll повертає масив усіх відмічених чекбоксів з цим name
      restrictions: formData.getAll('restrictions') as string[],
    };

    console.log(orderData);
    onSubmit?.(orderData);
  };

  return (
    <form action={handleOrder} className={css.form}>
      <fieldset className={css.fieldset}>
        <legend className={css.legend}>Client info:</legend>
        <label htmlFor={`${fieldId}-username`} className={css.label}>
          Name
        </label>
        <input type="text" name="username" id={`${fieldId}-username`} />

        <label htmlFor={`${fieldId}-email`} className={css.label}>
          Email
        </label>
        <input type="email" name="email" id={`${fieldId}-email`} />
      </fieldset>

      <fieldset className={css.fieldset}>
        <legend className={css.legend}>Delivery method:</legend>
        <label className={css.option}>
          <input type="radio" name="delivery" value="pickup" defaultChecked />
          Pickup
        </label>
        <label className={css.option}>
          <input type="radio" name="delivery" value="courier" />
          Courier
        </label>
        <label className={css.option}>
          <input type="radio" name="delivery" value="drone" />
          Drone delivery
        </label>
      </fieldset>

      <fieldset className={css.fieldset}>
        <legend className={css.legend}>Dietary restrictions:</legend>
        <label className={css.option}>
          <input type="checkbox" name="restrictions" value="vegan" />
          Vegan
        </label>
        <label className={css.option}>
          <input type="checkbox" name="restrictions" value="gluten-free" />
          Gluten-free
        </label>
        <label className={css.option}>
          <input type="checkbox" name="restrictions" value="nut-free" />
          Nut-free
        </label>
      </fieldset>

      <label htmlFor={`${fieldId}-deliveryTime`} className={css.label}>
        Preferred delivery time
      </label>
      <select
        name="deliveryTime"
        id={`${fieldId}-deliveryTime`}
        defaultValue=""
        className={css.input}
      >
        <option value="">-- Choose delivery time --</option>
        <option value="morning">Morning (8:00-12:00)</option>
        <option value="afternoon">Afternoon (12:00-16:00)</option>
        <option value="evening">Evening (16:00-20:00)</option>
      </select>

      <button type="submit" className={css.button}>
        Place order
      </button>
    </form>
  );
}
