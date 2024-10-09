import { useEffect } from 'react';

interface ModalProps {
  modalOpen: boolean;
  setModalOpen: () => void;
}

const Modal: React.FC<ModalProps> = ({ modalOpen, setModalOpen }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setModalOpen();
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
        <form method="dialog">
          <label className="modal-overlay" onClick={setModalOpen}></label>
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={setModalOpen}
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">Press ESC key or click on ✕ button to close</p>
      </div>
    </div>
  );
};

export default Modal;