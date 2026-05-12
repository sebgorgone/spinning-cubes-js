import { useRef, useEffect } from 'react';
import p5 from 'p5';
import intialize, { drawGrid, getRatio, rhombi } from './modules/initialization.js';
import { getCenters } from './modules/enumerate.js';
import { rotate } from './modules/spin.js';

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
        getRatio(width, height, scale)
        intialize(p, width, height);
        p.frameRate(0.5);
      };


      p.draw = () => {
        drawGrid(p, colors);
        const validCenters = getCenters();
        const randCenter = Math.floor(Math.random() * validCenters.length);
        console.log(validCenters)
        rotate(rhombi, validCenters[randCenter]);


      };
    };

    sketchRef.current = new p5(sketch, containerRef.current);
    return () => {
      if (sketchRef.current) {
        sketchRef.current.remove();
      }
    };
  }, [width, height, scale, colors]);

  return <div ref={containerRef} />;
};

export default TurningCubes;
