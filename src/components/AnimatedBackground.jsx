// src/components/AnimatedBackground.jsx
import React, { useEffect, useRef, useState } from 'react';

function AnimatedBackground() {
  const mountRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    let threeScript, vantaScript;

    const loadScripts = async () => {
      // Load THREE.js
      threeScript = document.createElement('script');
      threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
      threeScript.async = true;

      // Load Vanta.NET.js after THREE is ready
      threeScript.onload = () => {
        vantaScript = document.createElement('script');
        vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js';
        vantaScript.async = true;

        vantaScript.onload = () => {
          if (window.VANTA && window.VANTA.NET && mountRef.current && !vantaEffect) {
            const effect = window.VANTA.NET({
              el: mountRef.current,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200,
              minWidth: 200,
              scale: 1.0,
              scaleMobile: 1.0,
              color: 0x00cec9,
              backgroundColor: 0x1f1f1f,
              points: 10.0,
              maxDistance: 20.0,
              spacing: 15.0,
            });
            setVantaEffect(effect);
          }
        };

        document.body.appendChild(vantaScript);
      };

      document.body.appendChild(threeScript);
    };

    loadScripts();

    return () => {
      if (vantaEffect) vantaEffect.destroy();
      if (threeScript && document.body.contains(threeScript)) {
        document.body.removeChild(threeScript);
      }
      if (vantaScript && document.body.contains(vantaScript)) {
        document.body.removeChild(vantaScript);
      }
    };
  }, [vantaEffect]);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
      }}
    />
  );
}

export default AnimatedBackground;
