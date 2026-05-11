export default function initialize(p, w, h, scale) {

  let domain;

  if (w > h) {
    domain = w;
  } else {
    domain = h;
  }


  const r = domain * scale;

  const b = (Math.sqrt(3) * r) / 2;

  console.log(`width: ${w} - height: ${h} - scale: ${scale} - radius: ${r} - b value: ${b}`)


  let x = 0;
  let y = 0;

  let yStep = 0;
  let xStep = 0;

  p.push()
  p.fill(255,255,0);

  while (y < h - b) {

    while(x < w - b) {
      //label each point
      p.circle(x, y, 15);

      //step to the right
      if (xStep % 2 === 0) {
        x += (1.5 * r);
        y += b;
      } else {
        x += (1.5 * r);
        y -= b;
      }

      xStep++;
    }

    yStep++;

    xStep = 0;

    x = 0;
    y = 0 + ((2 * b) * yStep);

  }

  p.pop();

}

