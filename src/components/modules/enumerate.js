import { rhombi, wideAngles, getRhombusCoords } from './initialization.js';

export function getCenters() {
   const round2 = (n) => Math.round(n * 100) / 100;
   const centers = [];

   for (const angle of wideAngles) {
      const ax = round2(angle.x);
      const ay = round2(angle.y);
      const indices = [];

      for (let i = 0; i < rhombi.length; i++) {
         const rh = rhombi[i];
         const { x, y, x2, y2 } = getRhombusCoords(rh.posX, rh.posY, rh.angle);
         const rx = round2(x);
         const ry = round2(y);
         const rx2 = round2(x2);
         const ry2 = round2(y2);

         if ((ax === rx && ay === ry) || (ax === rx2 && ay === ry2)) {
            indices.push(i);
         }
      }

      if (indices.length === 3) {
         centers.push({ x: ax, y: ay, indices });
      }
   }

   return centers;
}