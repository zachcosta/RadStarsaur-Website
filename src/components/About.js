import React from 'react';
import './Pages.css';

const About = () => {
  return (
    <div className="page-content">
      <div className="page-container">
        <div className="about-content">

          <div className="about-text">
          <div className="avatar-signature-container">
            <img 
              src="/Avatar.gif" 
              alt="RadStarsaur Avatar" 
              className="about-avatar"
            />
            <div className="signature-text-container">
              <span className="about-label">About</span>
              <img 
                src="/Signature_Black.png" 
                alt="RadStarsaur Signature" 
                className="about-signature"
              />
            </div>
          </div>

            <p>
              Welcome to my digital art portfolio! My name is Zachary Costa, and I am a digital artist based out of California.
            </p>
            
            <p>
              My work spans from character designs and creature concepts to narrative 
              pieces and conceptual art. I have a major love for all things grotesque and monstrous, and have a special love for prehistoric life.
            </p>
            
            <h2>My Inspirations</h2>
            <p>
              My artowkr features a heavy focus on minimal color pallettes with strong contrasting colors, a trademark that comes from the Gameboy Color games I grew up playing like Pokemon Gold, and Link's Awakening. In addition to these, my style comes from a variety of other sources, such as Mesoamerican art, Monster Hunter, kaiju and tokusatsu, and Keith Haring.
            </p>
            
            <h2>Techniques & Mediums</h2>
            <p>
              I primarily work in digital, and my program of choice is ClipStudio Paint. Most of the brushes I use in my art are created by me. All of my animated pieces are also created in CSP, although I have done some of my fake video game animations using RPG Maker.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
