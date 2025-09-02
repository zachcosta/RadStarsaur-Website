import React from 'react';
import './AdventureSelector.css';
import { spooktoberData } from '../spooktoberData';

const AdventureSelector = ({ onAdventureSelect }) => {
  const adventures = spooktoberData.adventures.map(adventure => {
    // Handle both chaptered adventures and flat adventures
    let thumbnail;
    if (adventure.chapters && adventure.chapters.length > 0) {
      // Chaptered adventure (Adventures 1-3)
      const firstChapter = adventure.chapters[0];
      thumbnail = firstChapter ? firstChapter.scenes[0].filename : 'placeholder.png';
    } else if (adventure.scenes && adventure.scenes.length > 0) {
      // Flat adventure (Adventure 4)
      thumbnail = adventure.scenes[0].filename;
    } else {
      thumbnail = 'placeholder.png';
    }
    
    return {
      id: adventure.id,
      name: adventure.name,
      description: adventure.description,
      thumbnail: thumbnail
    };
  });

  return (
    <div className="adventure-selector">
      <div className="adventure-header">
        <h2>Spooktober Adventures</h2>
        <p>Choose your spooky adventure and experience the story in your preferred way</p>
      </div>
      
      <div className="adventure-grid">
        {adventures.map((adventure) => (
          <div 
            key={adventure.id} 
            className="adventure-card"
            onClick={() => onAdventureSelect(adventure.id)}
          >
            <div className="adventure-thumbnail">
              <img 
                src={`/Artworks/Spooktober/Adventure ${adventure.id}/${adventure.thumbnail}`}
                alt={adventure.name}
                onError={(e) => {
                  e.target.src = '/Artworks/placeholder.png';
                }}
              />
            </div>
                          <div className="adventure-info">
                <h3>{adventure.name}</h3>
                <p>{adventure.description}</p>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdventureSelector;
