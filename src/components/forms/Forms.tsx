// OrderForm — найпростіша форма в React 19.
// Функція передається в <form action>, React викликає її з FormData
// і сам очищає поля після сабміту.
interface OrderFormProps {
  onSubmit: (username: string) => void;
}

export default function OrderForm({ onSubmit }: OrderFormProps) {
  const handleSubmit = (formData: FormData) => {
    // Значення читаємо за атрибутом name інпута
    const username = formData.get('username') as string;
    if (username.trim() === '') {
      alert('Please enter your name!');
      return;
    }
    onSubmit(username);
  };

  return (
    <form action={handleSubmit}>
      <input type="text" name="username" />
      <button type="submit">Place order</button>
    </form>
  );
}
