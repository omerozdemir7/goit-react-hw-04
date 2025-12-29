import Modal from "react-modal";
import css from "./ImageModal.module.css";
import { useEffect } from "react";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0',
    border: 'none',
    background: 'transparent',
    overflow: 'hidden',
    maxWidth: '95vw',
    maxHeight: '95vh',
    width: 'auto',
    height: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    zIndex: 1200,
  }
};

export default function ImageModal({ isOpen, onClose, image, onNext, onPrev, hasNext, hasPrev }) {
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight' && hasNext) onNext();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onNext, onPrev, hasNext, hasPrev, onClose]);

  if (!image) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Image Detail"
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <div className={css.modalWrapper}>
        
        <button className={css.closeBtn} onClick={onClose} title="Kapat">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        {hasPrev && (
          <button className={`${css.navBtn} ${css.prevBtn}`} onClick={onPrev} title="Önceki">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
        )}

        <div className={css.contentContainer}>
            <img 
            src={image.urls.regular} 
            alt={image.alt_description} 
            className={css.image}
            />
            
            <div className={css.infoBar}>
                <div className={css.userInfo}>
                    <img src={image.user.profile_image.medium} alt={image.user.name} className={css.userAvatar} />
                    <div className={css.userDetails}>
                        <span className={css.userName}>{image.user.name}</span>
                        {image.user.location && <span className={css.userLocation}>{image.user.location}</span>}
                    </div>
                </div>
                <div className={css.imageActions}>
                     <a href={image.links.html} target="_blank" rel="noopener noreferrer" className={css.linkBtn}>Unsplash'te Gör</a>
                </div>
            </div>
        </div>

        {hasNext && (
          <button className={`${css.navBtn} ${css.nextBtn}`} onClick={onNext} title="Sonraki">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        )}
      </div>
    </Modal>
  );
}