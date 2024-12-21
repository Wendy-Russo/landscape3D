
updateMap(new Date().getUTCMilliseconds(),map.tileSize)

let delta = 1;

setInterval(() => {
  
  const floor = new plane(new vec(0.0,0.0,0.0),camera.rotation,camera.zoom,0)

  drawBackground(100,175,254);
  
  let {minX,maxX,minY,maxY} = floor.screenBoundaries()

  maxY += (256*camera.zoom * 0.5) //draw too far don 

  let distY = Math.max(camera.zoom,1) //higher = bad quality
  let distX = 1 //same as above, removes some columns and enables upscaling

  //FOLDING: Projection formula, part 1
  const point0 = floor.projPoints[1];
  const point1 = floor.projPoints[2];
  const point3 = floor.projPoints[0];

  const k0 = point1.y - point0.y;
  const k1 = point3.y - point0.y;
  
  const k2 = point1.x - point0.x;
  const k3 = point3.x - point0.x

  const k4 = 1 / (k0 * k3 - k1 * k2)
  const k6 = 1 / k1
  const k7 = 1 / k3

  for(let x = Math.round(minX) ; x < Math.round(maxX); x+=distX){

    let maxH = Math.round(maxY);
    let first = true;
    
    for(let y = Math.round(maxY) ; y > Math.round(minY); y-=distY){

      const pos2D = new vec(x,y,0)
      let kx = x - point0.x
      let ky = y - point0.y
      let u  = k4 * (ky*k3 - kx*k1)

      if(u > 0 && u < 1 ){

        let v = 0;
        if(k1 !== 0) {
          v  = k6 * (ky - u * k0)
        }
        else{
          v = k7 * (kx - u * k2)
        }

        if(v > 0 && v < 1){

          const texX = Math.floor(u*map.width)
          const texY = Math.floor(v*map.width)
          const imageID = texY*map.width+texX;
          const scaledHeight =  getDrawingHeight(texX,texY)
          const top = Math.round(pos2D.y)-scaledHeight
          
          if(maxH > 0 && top < maxH){ //prevents overdraw
            if(first){ //skip the first line 
              maxH = top
              first = false
              continue
            }
            const length = maxH - top
    
            DrawVerticalLineHEX(x,top,length,map.color[imageID])
            maxH = top
          }
        }
      }
      
    }
  }

  updateScreen();

}, 0);
