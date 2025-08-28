import React from 'react';
import './ArtworkGrid.css';
import ArtworkCard from './ArtworkCard';

const ArtworkGrid = ({ artworks, onArtworkClick }) => {
  return (
    <div className="artwork-grid">
      {artworks.map((artwork) => (
        <ArtworkCard
          key={artwork.id}
          artwork={artwork}
          onClick={() => onArtworkClick(artwork)}
        />
      ))}
    </div>
  );
};

export default ArtworkGrid;
