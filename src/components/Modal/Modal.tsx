// Modal — модальне вікно через портал.
// Закривається: хрестиком, кліком по фону або клавішею Escape.
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

interface ModalProps {
  onClose: () => void;
  // Додаємо пропс children і типізуємо його
  children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  // target — по чому клікнули, currentTarget — елемент зі слухачем (фон).
  // Якщо вони збігаються — клік був саме по фону, а не по вмісту модалки.
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  // Слухач клавіатури + блокування прокрутки, з очищенням при закритті
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  // createPortal рендерить розмітку в document.body, поза деревом App
  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>
        <button
          className={css.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        {/* Тут рендериться переданий вміст із пропса children */}
        {children}
      </div>
    </div>,
    document.body,
  );
}
