import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './AdventureViewer.css';
import { spooktoberData } from '../spooktoberData';

const AdventureViewer = ({ adventureId, onBack }) => {
  const [viewMode, setViewMode] = useState('gallery'); // 'gallery' or 'scroll'
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const scrollContainerRef = useRef(null);
  
  const adventure = spooktoberData.adventures.find(a => a.id === adventureId);
  
  // Handle both chaptered adventures and flat adventures
  const chapters = useMemo(() => {
    if (adventure?.chapters) {
      // Chaptered adventure (Adventures 1-3)
      return adventure.chapters;
    } else if (adventure?.scenes) {
      // Flat adventure (Adventure 4) - create a single chapter
      return [{
        id: 1,
        name: "All Episodes",
        scenes: adventure.scenes
      }];
    }
    return [];
  }, [adventure]);
  
  // Get current chapter and its scenes
  const currentChapter = chapters[currentChapterIndex];
  const currentChapterScenes = currentChapter?.scenes || [];
  
  // Get all scenes for overall progress calculation
  const allScenes = useMemo(() => {
    if (adventure?.chapters) {
      // Chaptered adventure
      return chapters.flatMap(chapter => chapter.scenes);
    } else if (adventure?.scenes) {
      // Flat adventure
      return adventure.scenes;
    }
    return [];
  }, [chapters, adventure]);

  const isVideo = (filename) => {
    return filename.toLowerCase().endsWith('.mp4');
  };

  const nextScene = useCallback(() => {
    if (currentSceneIndex < currentChapterScenes.length - 1) {
      setCurrentSceneIndex(currentSceneIndex + 1);
    } else if (currentChapterIndex < chapters.length - 1) {
      // Move to next chapter if at end of current chapter
      setCurrentChapterIndex(currentChapterIndex + 1);
      setCurrentSceneIndex(0);
    }
  }, [currentSceneIndex, currentChapterScenes.length, currentChapterIndex, chapters.length]);

  const prevScene = useCallback(() => {
    if (currentSceneIndex > 0) {
      setCurrentSceneIndex(currentSceneIndex - 1);
    } else if (currentChapterIndex > 0) {
      // Move to previous chapter if at beginning of current chapter
      setCurrentChapterIndex(currentChapterIndex - 1);
      setCurrentSceneIndex(chapters[currentChapterIndex - 1].scenes.length - 1);
    }
  }, [currentSceneIndex, currentChapterIndex, chapters]);

  const nextChapter = useCallback(() => {
    if (currentChapterIndex < chapters.length - 1) {
      setCurrentChapterIndex(currentChapterIndex + 1);
      setCurrentSceneIndex(0);
    }
  }, [currentChapterIndex, chapters.length]);

  const prevChapter = useCallback(() => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(currentChapterIndex - 1);
      setCurrentSceneIndex(0);
    }
  }, [currentChapterIndex]);

  const goToScene = useCallback((index) => {
    setCurrentSceneIndex(index);
  }, []);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(!isFullscreen);
  }, [isFullscreen]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      nextScene();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevScene();
    } else if (e.key === 'Escape') {
      if (isFullscreen) {
        setIsFullscreen(false);
      } else {
        onBack();
      }
    } else if (e.key === 'f' || e.key === 'F') {
      toggleFullscreen();
    }
  }, [isFullscreen, onBack, nextScene, prevScene, toggleFullscreen]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentSceneIndex, isFullscreen, handleKeyPress]);

  useEffect(() => {
    if (viewMode === 'scroll' && scrollContainerRef.current) {
      const currentElement = scrollContainerRef.current.children[currentSceneIndex];
      if (currentElement) {
        currentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentSceneIndex, viewMode]);

  if (!adventure) {
    return <div>Adventure not found</div>;
  }

  const currentScene = currentChapterScenes[currentSceneIndex];
  const isFlatAdventure = !adventure.chapters && adventure.scenes;

  return (
    <div className={`adventure-viewer ${isFullscreen ? 'fullscreen' : ''}`}>
      {/* Two-line unified header */}
      <div className="unified-header">
        {/* First line: Back button, title, view toggle */}
        <div className="header-line-1">
          <button className="back-button" onClick={onBack}>
            ← Back to Adventures
          </button>
          
          <div className="adventure-title">
            <h2>{adventure.name}</h2>
          </div>
          
          <div className="view-mode-toggle">
            <button 
              className={`toggle-btn ${viewMode === 'gallery' ? 'active' : ''}`}
              onClick={() => setViewMode('gallery')}
              title="Gallery View"
            >
              🖼️
            </button>
            <button 
              className={`toggle-btn ${viewMode === 'scroll' ? 'active' : ''}`}
              onClick={() => setViewMode('scroll')}
              title="Endless Scroll"
            >
              📜
            </button>
          </div>
        </div>
        
        {/* Second line: Chapter and page navigation */}
        <div className="header-line-2">
          {!isFlatAdventure && (
            <button 
              className="nav-btn chapter-btn" 
              onClick={prevChapter}
              disabled={currentChapterIndex === 0}
              title="Previous Chapter"
            >
              ‹ Previous Chapter
            </button>
          )}
          
          <button 
            className="nav-btn page-btn" 
            onClick={prevScene}
            disabled={currentSceneIndex === 0}
            title={isFlatAdventure ? "Previous Episode" : "Previous Page"}
          >
            ‹ {isFlatAdventure ? "Previous Episode" : "Previous Page"}
          </button>
          
          <div className="navigation-info">
            <span className="chapter-name">
              {isFlatAdventure ? "All Episodes" : chapters[currentChapterIndex]?.name}
            </span>
            <span className="page-number">
              {isFlatAdventure ? `Episode ${currentSceneIndex + 1}` : `Page ${currentSceneIndex + 1}`} / {currentChapterScenes.length}
            </span>
          </div>
          
          <button 
            className="nav-btn page-btn" 
            onClick={nextScene}
            disabled={currentSceneIndex === currentChapterScenes.length - 1}
            title={isFlatAdventure ? "Next Episode" : "Next Page"}
          >
            {isFlatAdventure ? "Next Episode" : "Next Page"} ›
          </button>
          
          {!isFlatAdventure && (
            <button 
              className="nav-btn chapter-btn" 
              onClick={nextChapter}
              disabled={currentChapterIndex === chapters.length - 1}
              title="Next Chapter"
            >
              Next Chapter ›
            </button>
          )}
        </div>
      </div>

      {viewMode === 'gallery' ? (
        <div className="gallery-view">
          <div className="scene-display">
            {isVideo(currentScene.filename) ? (
              <video
                src={`/Artworks/Spooktober/Adventure ${adventureId}/${currentScene.filename}`}
                controls
                autoPlay
                muted
                loop
                playsInline
                className="scene-media"
              />
            ) : (
              <img
                src={`/Artworks/Spooktober/Adventure ${adventureId}/${currentScene.filename}`}
                alt={currentScene.altText}
                className="scene-media"
              />
            )}
          </div>

          <div className="gallery-thumbnails">
            {currentChapterScenes.map((scene, index) => (
              <div
                key={scene.id}
                className={`thumbnail ${index === currentSceneIndex ? 'active' : ''}`}
                onClick={() => goToScene(index)}
              >
                {isVideo(scene.filename) ? (
                  <video
                    src={`/Artworks/Spooktober/Adventure ${adventureId}/${scene.filename}`}
                    muted
                    preload="metadata"
                    className="thumbnail-media"
                  />
                ) : (
                  <img
                    src={`/Artworks/Spooktober/Adventure ${adventureId}/${scene.filename}`}
                    alt={scene.altText}
                    className="thumbnail-media"
                  />
                )}
                <span className="thumbnail-number">{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="scroll-view" ref={scrollContainerRef}>
          {chapters.map((chapter, chapterIndex) => (
            <div key={chapter.id} className="chapter-section">
              <div className="chapter-header">
                <h3>{chapter.name}</h3>
              </div>
              {chapter.scenes.map((scene, sceneIndex) => (
                <div key={scene.id} className="scroll-scene">
                  <div className="scroll-scene-header">
                    <span className="scene-number">
                      {isFlatAdventure ? `Episode ${sceneIndex + 1}` : sceneIndex + 1}
                    </span>
                    <span className="scene-title">{scene.altText}</span>
                    <span className="chapter-label">{chapter.name}</span>
                  </div>
                  
                  <div className="scroll-scene-content">
                    {isVideo(scene.filename) ? (
                      <video
                        src={`/Artworks/Spooktober/Adventure ${adventureId}/${scene.filename}`}
                        controls
                        muted
                        loop
                        playsInline
                        className="scroll-scene-media"
                      />
                    ) : (
                      <img
                        src={`/Artworks/Spooktober/Adventure ${adventureId}/${scene.filename}`}
                        alt={scene.altText}
                        className="scroll-scene-media"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      <div className="viewer-controls">
        <button className="fullscreen-btn" onClick={toggleFullscreen}>
          {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </button>
        <div className="keyboard-hints">
          <span>← → Arrow keys to navigate</span>
          <span>Space to advance</span>
          <span>F for fullscreen</span>
          <span>ESC to go back</span>
        </div>
      </div>
    </div>
  );
};

export default AdventureViewer;
