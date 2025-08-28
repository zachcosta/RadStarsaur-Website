import React, { useState } from 'react';
import './ArtworkCard.css';

const ArtworkCard = ({ artwork, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="artwork-card" onClick={onClick}>
      <div className="artwork-image-container">
        {!imageLoaded && !imageError && (
          <div className="artwork-skeleton">
            <div className="skeleton-animation"></div>
          </div>
        )}
        
        {imageError ? (
          <div className="artwork-error">
            <span>Image not found</span>
          </div>
        ) : (
          <img
            src={`/Artworks/${artwork.filename}`}
            alt={artwork.altText}
            className={`artwork-thumbnail ${imageLoaded ? 'loaded' : ''}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
        )}
      </div>
      
      <div className="artwork-info">
        <h3 className="artwork-title">{artwork.name}</h3>
        <span className="artwork-category">{artwork.category}</span>
      </div>
    </div>
  );
};

export default ArtworkCard;
