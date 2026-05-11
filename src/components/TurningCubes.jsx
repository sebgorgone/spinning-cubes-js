import React, { useRef, useEffect } from 'react';
import p5 from 'p5';
import intialize from './modules/initialization.js';

/**
 * TurningCubes Component
 *
 * Renders a p5 canvas with the specified width and height.
 * No draw loop is added; the canvas is only initialized.
 *
 * Props:
 * - width: number (required) - canvas width in pixels
 * - height: number (required) - canvas height in pixels
 * - scale: number (optional) - reserved for future use, not applied
 * - colors: Array<{r: number, g: number, b: number}> (optional) - reserved for future use, not applied
 */
const TurningCubes = ({ width, height, scale, colors }) => {
  const containerRef = useRef(null);
  const sketchRef = useRef(null);

  useEffect(() => {
    const sketch = (p) => {


      p.setup = () => {
        p.createCanvas(width, height);
        p.background(51);
        intialize(p, width, height, scale);
      };


      p.draw = () => {


      };
    };

    sketchRef.current = new p5(sketch, containerRef.current);
    return () => {
      if (sketchRef.current) {
        sketchRef.current.remove();
      }
    };
  }, [width, height]);

  return <div ref={containerRef} />;
};

export default TurningCubes;
