import React, { useEffect } from 'react';
import './ImageModal.css';

const ImageModal = ({ artwork, onClose }) => {
  const isVideo = (filename) => {
    return filename.toLowerCase().endsWith('.mp4');
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <div className="modal-background-image">
          {isVideo(artwork.filename) ? (
            <video
              src={`/Artworks/${artwork.filename}`}
              className="blurred-background"
              muted
              loop
              playsInline
              preload="metadata"
            />
          ) : (
            <img
              src={`/Artworks/${artwork.filename}`}
              alt=""
              className="blurred-background"
            />
          )}
        </div>
        
        <button className="modal-close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <div className="modal-image-container">
          {isVideo(artwork.filename) ? (
            <video
              src={`/Artworks/${artwork.filename}`}
              className="modal-image"
              controls
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          ) : (
            <img
              src={`/Artworks/${artwork.filename}`}
              alt={artwork.altText}
              className="modal-image"
            />
          )}
        </div>
        
        <div className="modal-info">
          <h2 className="modal-title">{artwork.name}</h2>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
