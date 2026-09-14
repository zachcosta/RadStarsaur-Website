import React, { useState } from 'react';
import './ArtworkGrid.css';
import ArtworkCard from './ArtworkCard';

const FILTERS = [
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'Fantasy Art', label: 'Fantasy Art' },
  { id: 'Nature Art', label: 'Nature Art' },
  { id: 'Character Art', label: 'Character Art' },
  { id: 'Fan Art', label: 'Fan Art' },
];

const shuffleArtworks = (items) => {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const ArtworkGrid = ({ artworks, onArtworkClick }) => {
  const [activeFilter, setActiveFilter] = useState('portfolio');
  const [shuffledArtworks] = useState(() => shuffleArtworks(artworks));

  const filteredArtworks = shuffledArtworks.filter((artwork) => {
    if (activeFilter === 'portfolio') {
      return artwork.portfolio === true;
    }
    return artwork.category === activeFilter;
  });

  return (
    <div className="artwork-gallery">
      <div className="gallery-filters" role="tablist" aria-label="Artwork filters">
        {FILTERS.map((filter) => (
          <button
            key={filter.id}
            type="button"
            role="tab"
            aria-selected={activeFilter === filter.id}
            className={`gallery-filter ${activeFilter === filter.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="artwork-grid">
        {filteredArtworks.map((artwork) => (
          <ArtworkCard
            key={artwork.id}
            artwork={artwork}
            onClick={() => onArtworkClick(artwork)}
          />
        ))}
      </div>
    </div>
  );
};

export default ArtworkGrid;
