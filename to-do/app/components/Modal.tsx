import { useEffect } from 'react';

interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setModalOpen(false);
      }
    };

    if (modalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalOpen, setModalOpen]);

  return (
    <div className={`modal ${modalOpen ? 'modal-open' : ''}`}>
      <div className="modal-box">
        <label className="modal-overlay" onClick={() => setModalOpen(false)}></label>
        <button
          type="button"
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => setModalOpen(false)}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;