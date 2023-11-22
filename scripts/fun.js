
updateMap(16021,map.tileSize)

let delta = 1;

const times = []

function adjustArrayToHistogram(array, targetHistogram) {
  const currentHistogram = getHistogramFromArray(array);

  for (let value = 0; value < targetHistogram.length; value++) {
    const targetCount = targetHistogram[value];
    const currentCount = currentHistogram[value];

    if (currentCount > targetCount) {
      // Remove excess occurrences of the value
      const excessCount = currentCount - targetCount;
      for (let i = 0; i < excessCount; i++) {
        const indexToRemove = array.indexOf(value);
        array.splice(indexToRemove, 1);
      }
    } else if (currentCount < targetCount) {
      // Add missing occurrences of the value
      const missingCount = targetCount - currentCount;
      for (let i = 0; i < missingCount; i++) {
        array.push(value);
      }
    }
    // If currentCount === targetCount, no modification needed for this value
  }

  return array;
}


setInterval(() => {
  
  const floor = new plane(new vec(0.0,0.0,0.0),camera.rotation,camera.zoom,0)

  drawBackground(100,175,254);
  
  const time = new Date();
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

  if(distX > 1){
    for(let x = Math.round(minX)+1 ; x < Math.round(maxX)+1; x+=2){
      for(let y = Math.round(maxY) ; y > 0; y-=1){
        screen.buff32[y*screen.width+x] = screen.buff32[y*screen.width+(x-1)] 
      }
    }
  }
  
  drawUI()

  function recreateTerrainCrossSection(histogram, axisLength, maxHeight, smoothingFactor) {
    const crossSection = [];
  
    for (let i = 0; i < axisLength; i++) {
      const normalizedIntensity = histogram[i] / maxHeight;
      const smoothedIntensity = Math.pow(normalizedIntensity, smoothingFactor);
      crossSection.push(Array.from({ length: smoothedIntensity * axisLength }, () => 1));
    }
  
    return crossSection;
  }
  
  

  const profile = getCumulativeHistogram(map.ref);
  const cross = recreateTerrainCrossSection(map.ref,512,512,2)

  const step = Math.ceil(map.profile.length/256)
  for(let i = 0 ; i < map.profile.length; i++){

    const bX = 0;
    const bY = 480;

    let smooth = i/map.profile.length*step
    smooth = Math.pow(smooth,2)*3 - Math.pow(smooth,3)*2

    let height = map.profile[i*step]/Math.max(... map.profile)
    
    height = Math.round(lerp(smooth,height,map.strictness)*60)
    const x = bX+i
    DrawVerticalLine(x,bY-height,height,0,0,0)
  }

  updateScreen();

  

  if(camera.autoRotate){
    camera.rotation.z -= radiantsToDegrees(0.001)
  }


  delta = new Date() - time
  times.push(delta)
  const timeMS = calculateAverage(times).toFixed(2)
  const fps = Math.round(1000/timeMS);
  /*console.log(
    timeMS + " ms \n" + 
    times.length + " frames \n" + 
    fps + " fps \n" +
    times[times.length-1] + " last image \n" +
    Math.round(1000/times[times.length-1]) + " last fps \n" +
    camera.zoom.toFixed(1) + " zoom"
  )*/
}, 0);
