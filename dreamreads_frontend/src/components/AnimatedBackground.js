import React, { useEffect } from 'react';
import './AnimatedBackground.css';

/**
 * PUBLIC_INTERFACE
 * Animated dreamlike background with floating shapes.
 */
function AnimatedBackground() {
  useEffect(() => {
    // Optionally: JS-based animation (more could be added)
  }, []);
  return (
    <div className="animated-bg">
      <div className="dream-blob blob1"></div>
      <div className="dream-blob blob2"></div>
      <div className="dream-blob blob3"></div>
      <div className="dream-blob blob4"></div>
    </div>
  );
}

export default AnimatedBackground;
