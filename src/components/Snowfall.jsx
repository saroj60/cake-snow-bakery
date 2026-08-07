import React, { useRef, useEffect, useCallback } from 'react';
import './Snowfall.css';

/**
 * Canvas-based snowfall animation component.
 * Renders a fixed, full-viewport canvas with falling snowflakes.
 * Uses requestAnimationFrame for smooth 60fps animation.
 * pointer-events: none ensures no interaction blocking.
 */
const Snowfall = () => {
  const canvasRef = useRef(null);
  const snowflakesRef = useRef([]);
  const animFrameRef = useRef(null);

  // Determine snowflake count based on screen width
  const getCount = useCallback(() => {
    if (typeof window === 'undefined') return 50;
    return window.innerWidth < 768 ? 35 : 60;
  }, []);

  // Create a single snowflake with randomised properties
  const createSnowflake = useCallback((canvasWidth, canvasHeight, startAtTop = false) => {
    const size = Math.random() * 3 + 2; // 2–5px
    return {
      x: Math.random() * canvasWidth,
      y: startAtTop ? -size : Math.random() * canvasHeight,
      size,
      speed: Math.random() * 1 + 0.5,          // 0.5–1.5 px/frame
      opacity: Math.random() * 0.6 + 0.3,       // 0.3–0.9
      drift: Math.random() * 0.6 - 0.3,         // horizontal drift per frame
      sineAmplitude: Math.random() * 0.8 + 0.2,  // gentle sine wave
      sineSpeed: Math.random() * 0.02 + 0.005,   // sine frequency
      phase: Math.random() * Math.PI * 2,         // random start phase
    };
  }, []);

  // Initialise all snowflakes
  const initSnowflakes = useCallback((canvasWidth, canvasHeight) => {
    const count = getCount();
    const flakes = [];
    for (let i = 0; i < count; i++) {
      flakes.push(createSnowflake(canvasWidth, canvasHeight, false));
    }
    snowflakesRef.current = flakes;
  }, [getCount, createSnowflake]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Size canvas to viewport
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Reinitialise if count changed (e.g. resize across breakpoint)
      if (snowflakesRef.current.length !== getCount()) {
        initSnowflakes(canvas.width, canvas.height);
      }
    };

    resize();
    initSnowflakes(canvas.width, canvas.height);
    window.addEventListener('resize', resize);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      snowflakesRef.current.forEach((flake) => {
        // Update position
        flake.phase += flake.sineSpeed;
        flake.x += flake.drift + Math.sin(flake.phase) * flake.sineAmplitude;
        flake.y += flake.speed;

        // Wrap around when below viewport
        if (flake.y > canvas.height + flake.size) {
          flake.y = -flake.size;
          flake.x = Math.random() * canvas.width;
        }
        // Wrap horizontally
        if (flake.x > canvas.width + flake.size) {
          flake.x = -flake.size;
        } else if (flake.x < -flake.size) {
          flake.x = canvas.width + flake.size;
        }

        // Draw snowflake
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
        ctx.shadowBlur = flake.size * 2;
        ctx.fill();
        ctx.closePath();
      });

      // Reset shadow so it doesn't leak
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [getCount, initSnowflakes]);

  return <canvas ref={canvasRef} className="snowfall-canvas" aria-hidden="true" />;
};

export default Snowfall;
