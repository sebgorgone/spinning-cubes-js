export let rhombi = [];
//all obtuse angles for potential center points
export let wideAngles = [];

let domain;
let r;
let b;


export function getRatio(w, h, scale) {
  
  if (w > h) {
    domain = w;
  } else {
    domain = h;
  }

  r = domain * scale;
  b = (Math.sqrt(3) * r) / 2;

  console.log(`
width: ${w} 
height: ${h} 
scale: ${scale} 
radius: ${r} 
b value: ${b}
  `);

  return { w, h, scale}
}


export default function initialize(p, w, h) {
  rhombi = [];


  let x = 0;
  let y = 0;
  let pi = Math.PI;

  let yStep = 0;

  p.push()
  p.fill(255, 255, 0);

  while (y < h + b) {

    while (x < w + b) {

      //create rhombus objects

      for (let i = 0; i < 3; i++) {
        rhombi.push({
          posX: x,
          posY: y,
          angle: (pi * 0.5) + (i * ((2 / 3) * pi)),
          face: i
        })
      }

      //step to the right
      x += 2 * b;

    }

    yStep++;

    //offset the next y position to tile cleanly
    if (yStep % 2 === 0) {
      x = 0;
    } else {
      x = b;
    }
    y = 0 + ((1.5 * r) * yStep);

  }
  p.pop();

  console.log('rhombus count: ' + rhombi.length);

}








export function getRhombusCoords(x, y, theta) {
  let pi = Math.PI;

  const cos = (theta) => { return Math.cos(theta) };
  const sin = (theta) => { return Math.sin(theta) };

  const x1 = x + (r * cos(theta + (pi / 3)));
  const y1 = y + (r * sin(theta + (pi / 3)));
  const x2 = x + (r * cos(theta));
  const y2 = y + (r * sin(theta));
  const x3 = x + (r * cos(theta - (pi / 3)));
  const y3 = y + (r * sin(theta - (pi / 3)));

  return { x, y, x1, y1, x2, y2, x3, y3 }
}



export function drawGrid(p, color) {
  let c0;
  let c1;
  let c2;
  
  if (Array.isArray(color)) {
    c0 = color[0];
    c1 = color[1];
    c2 = color[2];
  } else {
    c0 = { r: 255, g: 255, b: 255 };
    c1 = { r: 125, g: 125, b: 125 };
    c2 = { r: 0, g: 0, b: 0 };
  }

  for (let rhombus of rhombi) {
    p.push();
    const {
      x,
      y,
      x1,
      y1,
      x2,
      y2,
      x3,
      y3
    } = getRhombusCoords(rhombus.posX, rhombus.posY, rhombus.angle);

    if (rhombus.face === 1) {
      p.fill(c1.r, c1.g, c1.b)
      p.quad(x, y, x1, y1, x2, y2, x3, y3)
    } else if (rhombus.face === 2) {
      p.fill(c2.r, c2.g, c2.b)
      p.quad(x, y, x1, y1, x2, y2, x3, y3)
    }
    if (rhombus.face === 0) {
      p.fill(c0.r, c0.g, c0.b)
      p.quad(x, y, x1, y1, x2, y2, x3, y3)
    }
    p.pop();
  }

  wideAngles = [];

  const round2 = (n) => Math.round(n * 100) / 100;
  const pointMap = new Map();
  const pointSet = new Set();

  for (const rh of rhombi) {
    const { x, y, x2, y2 } = getRhombusCoords(rh.posX, rh.posY, rh.angle);

    for (const [px, py] of [[x, y], [x2, y2]]) {
      const nx = round2(px);
      const ny = round2(py);
      const key = `${nx},${ny}`;

      if (pointSet.has(key)) {
        continue;
      }

      pointSet.add(key);

      const point = { label: key, x: nx, y: ny };
      pointMap.set(key, point);
      wideAngles.push(point);
    }
  }

  wideAngles.sort((A, B) => {
    if (A.x !== B.x) return A.x - B.x;
    return A.y - B.y;
  });

  console.log('unique centers: ' + wideAngles.length);
}
