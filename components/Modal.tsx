import React, { useEffect } from 'react';
import { XCircleIcon } from './Icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 z-[100] flex justify-center items-center p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-surface dark:bg-dark-surface rounded-lg shadow-2xl w-full max-w-4xl transform transition-all animate-slide-up"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <div className="flex justify-between items-center p-4 border-b border-border-color dark:border-dark-border-color">
          <h2 id="modal-title" className="text-xl font-bold text-text-primary dark:text-dark-text-primary">{title}</h2>
          <button
            onClick={onClose}
            className="text-text-muted dark:text-dark-text-muted hover:text-text-primary dark:hover:text-dark-text-primary transition-colors"
            aria-label="Close modal"
          >
            <XCircleIcon className="w-8 h-8" />
          </button>
        </div>
        <div className="p-6 text-text-primary dark:text-dark-text-primary">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;