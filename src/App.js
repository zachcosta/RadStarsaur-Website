import React, { useState } from 'react';
import './App.css';
import { artworkData } from './artworkData';
import ArtworkGrid from './components/ArtworkGrid';
import ImageModal from './components/ImageModal';
import About from './components/About';
import Contact from './components/Contact';
import AdventureSelector from './components/AdventureSelector';
import AdventureViewer from './components/AdventureViewer';
import { featureFlags } from './config/featureFlags';
import bgPattern from './BG_Pattern.png';

function App() {
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('gallery');
  const [spooktoberPage, setSpooktoberPage] = useState('selector'); // 'selector' or 'viewer'
  const [selectedAdventure, setSelectedAdventure] = useState(null);

  const handleArtworkClick = (artwork) => {
    setSelectedArtwork(artwork);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArtwork(null);
  };

  const handleExternalLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleAdventureSelect = (adventureId) => {
    setSelectedAdventure(adventureId);
    setSpooktoberPage('viewer');
  };

  const handleAdventureBack = () => {
    setSpooktoberPage('selector');
    setSelectedAdventure(null);
  };

  // Reset to gallery if Spooktober is hidden and user is on that page
  React.useEffect(() => {
    if (!featureFlags.showSpooktoberAdventures && currentPage === 'spooktober') {
      setCurrentPage('gallery');
    }
  }, [currentPage]);

  return (
    <div className="App" style={{ '--bg-pattern': `url(${bgPattern})` }}>
      <header className="App-header">
        <h1>RadStarsaur Art</h1>
        <p>A collection of digital artwork and illustrations by Zachary Costa</p>
        
        <nav className="App-nav">
          <button 
            className={`nav-link ${currentPage === 'gallery' ? 'active' : ''}`}
            onClick={() => setCurrentPage('gallery')}
          >
            Gallery
          </button>
          {featureFlags.showSpooktoberAdventures && (
            <button 
              className={`nav-link ${currentPage === 'spooktober' ? 'active' : ''}`}
              onClick={() => setCurrentPage('spooktober')}
            >
              Spooktober Adventures
            </button>
          )}
          <button 
            className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}
            onClick={() => setCurrentPage('about')}
          >
            About
          </button>
          <button 
            className={`nav-link ${currentPage === 'instagram' ? 'active' : ''}`}
            onClick={() => handleExternalLink('https://instagram.com/radstarsaur')}
          >
            Instagram
          </button>
          <button 
            className={`nav-link ${currentPage === 'store' ? 'active' : ''}`}
            onClick={() => handleExternalLink('https://etsy.com/shop/radstarsaur')}
          >
            Store
          </button>
          <button 
            className={`nav-link ${currentPage === 'contact' ? 'active' : ''}`}
            onClick={() => setCurrentPage('contact')}
          >
            Contact
          </button>
        </nav>
      </header>
      
      <main className="App-main">
        {currentPage === 'gallery' && (
          <ArtworkGrid 
            artworks={artworkData} 
            onArtworkClick={handleArtworkClick}
          />
        )}
        
        {featureFlags.showSpooktoberAdventures && currentPage === 'spooktober' && (
          <>
            {spooktoberPage === 'selector' && (
              <AdventureSelector onAdventureSelect={handleAdventureSelect} />
            )}
            {spooktoberPage === 'viewer' && selectedAdventure && (
              <AdventureViewer 
                adventureId={selectedAdventure} 
                onBack={handleAdventureBack} 
              />
            )}
          </>
        )}
        
        {currentPage === 'about' && <About />}
        {currentPage === 'contact' && <Contact />}
      </main>

      {isModalOpen && selectedArtwork && (
        <ImageModal
          artwork={selectedArtwork}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default App;
