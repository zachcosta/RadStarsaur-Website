import React, { useState } from 'react';
import './ArtworkCard.css';

const ArtworkCard = ({ artwork, onClick }) => {
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const [mediaError, setMediaError] = useState(false);

  const isVideo = (filename) => {
    return filename.toLowerCase().endsWith('.mp4');
  };

  const handleMediaLoad = () => {
    setMediaLoaded(true);
  };

  const handleMediaError = () => {
    setMediaError(true);
  };

  // Get crop center coordinates or default to center
  const getCropStyle = () => {
    const cropCenter = artwork.cropCenter || { x: '50%', y: '50%' };
    return {
      objectPosition: `${cropCenter.x} ${cropCenter.y}`
    };
  };

  return (
    <div className="artwork-card" onClick={onClick}>
      <div className="artwork-image-container">
        {!mediaLoaded && !mediaError && (
          <div className="artwork-skeleton">
            <div className="skeleton-animation"></div>
          </div>
        )}
        
        {mediaError ? (
          <div className="artwork-error">
            <span>Media not found</span>
          </div>
        ) : isVideo(artwork.filename) ? (
          <video
            src={`/Artworks/${artwork.filename}`}
            className={`artwork-thumbnail ${mediaLoaded ? 'loaded' : ''}`}
            style={getCropStyle()}
            onLoadedData={handleMediaLoad}
            onError={handleMediaError}
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : (
          <img
            src={`/Artworks/${artwork.filename}`}
            alt={artwork.altText}
            className={`artwork-thumbnail ${mediaLoaded ? 'loaded' : ''}`}
            style={getCropStyle()}
            onLoad={handleMediaLoad}
            onError={handleMediaError}
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
