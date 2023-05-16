import { useEffect } from 'react';
import { Overlay, ModalBox } from './Modal.styled';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export function Modal({largeImageURL, alt, onClose}) {
  
  useEffect(() => {
    const handleKeyDown = e => {
        console.log("hello");
    if (e.code === 'Escape') {
      onClose();
    }
    };
    
   window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleOverlayClick}>
      <ModalBox>
        <img src={largeImageURL} alt={alt} />
      </ModalBox>
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
