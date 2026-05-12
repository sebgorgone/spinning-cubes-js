export function rotate(rhombi, center) {

   for (let i of center.indices) {
      if (rhombi[i].posX !== center.x || rhombi[i].posY !== center.y) {
         rhombi[i].posX = center.x;
         rhombi[i].posY = center.y;
         rhombi[i].angle += Math.PI;
      }
      rhombi[i].angle += Math.PI;
   }


}