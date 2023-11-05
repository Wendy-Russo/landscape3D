
updateMap(20,256)



const times = []
setInterval(() => {
  
  const m = new Matrix()
  m.rotation(camera.rotation.x,camera.rotation.y,camera.rotation.z)

  const floor = new plane(new vec(0.0,0.0,0.0),camera.rotation,camera.zoom,0)


  drawBackground(100,175,254);
  
  const time = new Date();

  let minX = Math.min(floor.projPoints[0].x ,floor.projPoints[1].x ,floor.projPoints[2].x ,floor.projPoints[3].x )
  minX = 0//Math.max(minX,0)

  let maxX = Math.max(floor.projPoints[0].x ,floor.projPoints[1].x ,floor.projPoints[2].x ,floor.projPoints[3].x )
  maxX = 640 // Math.min(maxX,screen.width)

  let minY = Math.min(floor.projPoints[0].y ,floor.projPoints[1].y ,floor.projPoints[2].y ,floor.projPoints[3].y )
  minY = 0// Math.max(minY,0)

  let maxY = Math.max(floor.projPoints[0].y ,floor.projPoints[1].y ,floor.projPoints[2].y ,floor.projPoints[3].y )
  maxY = 480 // Math.min(maxY,screen.height) + (256*camera.zoom * 0.5)+80

  let distY = Math.max(camera.zoom,1) //higher = bad quality
  let distX = 1 //same as above, removes some columns and enables upscaling

  const halfZoom = camera.zoom*0.5
  const heightMult = camera.zoom/screen.height*256

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

      if(isPointInQuadrilateral(pos2D,floor.projPoints)){ //isPointInQuadrilateral(pos2D,floor.projPoints)
        
        let kx = x - point0.x
        let ky = y - point0.y
        let u  = k4 * (ky*k3 - kx*k1)

        let v = 0;
        if(k1 !== 0) {
          v  = k6 * (ky - u * k0)
        }
        else{
          v = k7 * (kx - u * k2)
        }
        

        //const pos3D  = projectTo3D(pos2D)
        //const pos3DRot = m.multiply(pos3D)

        //const texX = Math.floor(remap(pos3DRot.x,-halfZoom,halfZoom,0,map.width))
        //const texY = Math.floor(remap(pos3DRot.y,-halfZoom,halfZoom,0,map.width))
        
        const texX = Math.floor(remap(u,0,1,0,map.width))
        const texY = Math.floor(remap(v,0,1,0,map.height))

        //if(texX < 0 || texY < 0 || texX > 511 || texY > 511) continue

        const imageID = texY*map.width+texX;
        const scaledHeight =  Math.round(map.elevation[imageID]*heightMult)
        const top = Math.round(pos2D.y+80)-scaledHeight
        
        if(top < -(maxH - top)+1){ //makes sure you don't draw above the top of the screen
          break
        }
        else if(top < maxH){ //prevents overdraw
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

  if(distX > 1){
    for(let x = Math.round(minX)+1 ; x < Math.round(maxX)+1; x+=2){
      for(let y = Math.round(maxY) ; y > 0; y-=1){
        screen.buff32[y*screen.width+x] = screen.buff32[y*screen.width+(x-1)] 
      }
    }
  }

  for(let x = 500; x<screen.width; x++){
    for(let y = 0; y<screen.height; y++){
      if(isInRectangle(x,y,button)){
        drawPixel(x,y,255,255,255)
      } else if(isInRectangle(x,y,buttonStop)){
        drawPixel(x,y,255,255,255)
      }
    }
  }

  const size = 3;

  const startX = button.x + size
  const startY = button.y + size
  drawN(startX,startY,size)
  drawE(startX + (size*5),startY,size)
  drawW(startX + (size*10),startY,size)

  let lineX = 0

  drawI(startX + (size*lineX),startY+(size*6),size)
  drawM(startX + (size*(lineX+2)),startY+(size*6),size)
  drawG(startX + (size*(lineX+8)),startY+(size*6),size)

  if(camera.autoRotate){
    drawPlay(buttonStop.x + size*1,buttonStop.y + size * 1,size,0)
    drawPause(buttonStop.x + size*5,buttonStop.y + size * 1,size,127)
  }else{
    drawPlay(buttonStop.x + size*1,buttonStop.y + size * 1,size,127)
    drawPause(buttonStop.x + size*5,buttonStop.y + size * 1,size,0)
  }


  updateScreen();

  if(camera.autoRotate){
    camera.rotation.z -= 1/10
  }

  times.push(new Date() - time)
  const timeMS = calculateAverage(times).toFixed(2)
  const fps = Math.round(1000/timeMS);
  console.log(
    timeMS + " ms \n" + 
    times.length + " frames \n" + 
    fps + " fps \n" +
    times[times.length-1] + " last image \n" +
    Math.round(1000/times[times.length-1]) + " last fps \n" +
    camera.zoom.toFixed(1) + " zoom"
  )

}, 0);

window.addEventListener("wheel", (e) => 
  { 
    camera.zoom += (e.deltaY > 0 ? -0.1 : 0.1)
    camera.zoom = Math.max(camera.zoom,0.25)
    camera.zoom = Math.min(camera.zoom,8)
  }
)

window.addEventListener("click", (e) => {
  const canvasWidth = document.getElementById("canvas").offsetWidth
  const mouseX = e.offsetX
  const hoverX = Math.round(mouseX/canvasWidth*screen.width)
  
  const canvasHeight = document.getElementById("canvas").offsetHeight
  const mouseY = e.offsetY
  const hoverY = Math.round(mouseY/canvasHeight*screen.height)

  if(isInRectangle(hoverX,hoverY,button))
  {
    updateMap(Math.round(Math.random() * 1024 * 32),256)
  }

  if(isInRectangle(hoverX,hoverY,buttonStop))
  {
    camera.autoRotate = !camera.autoRotate
  }
})




/*BASICALLY

point0 = screen space coordinates for (0,0) in texture space
point1 = screen space coordinates for (width,0) in texture space
point2 = screen space coordinates for (0,height) in texture space

  CHANGES WHEN CAMERA MOVES

xVecY = point1.y - point0.y
xVecX = point1.x - point0.x

yVecY = point2.y - point0.y
yVecX = point2.x - point0.x

k4 = 1 / xVecY * yVecX - yVecY * xVecX
k6 = 1 / yVecY
k7 = 1 / yVecX

  CHANGES FOR EACH PIXEL

kx = xi - point0.x
ky = yi - point0.y
u  = k4 * (ky*k3 - kx*yVecY)
v  = k6 * (ky - u * xVecY)
(v = k7 * (kx - u * xVecX))

*/