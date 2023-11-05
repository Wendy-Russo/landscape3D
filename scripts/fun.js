
updateMap(20,256)



const times = []
setInterval(() => {
  
  const m = new Matrix()
  m.rotation(camera.rotation.x,camera.rotation.y,camera.rotation.z)

  const floor = new plane(new vec(0.0,0.0,0.0),camera.rotation,camera.zoom,0)


  drawBackground(100,175,254);
  
  const time = new Date();

  let minX = Math.min(floor.projPoints[0].x ,floor.projPoints[1].x ,floor.projPoints[2].x ,floor.projPoints[3].x )
  minX = Math.max(minX,0)

  let maxX = Math.max(floor.projPoints[0].x ,floor.projPoints[1].x ,floor.projPoints[2].x ,floor.projPoints[3].x )
  maxX = Math.min(maxX,screen.width)

  let minY = Math.min(floor.projPoints[0].y ,floor.projPoints[1].y ,floor.projPoints[2].y ,floor.projPoints[3].y )
  minY = Math.max(minY,0)

  let maxY = Math.max(floor.projPoints[0].y ,floor.projPoints[1].y ,floor.projPoints[2].y ,floor.projPoints[3].y )
  maxY = Math.min(maxY,screen.height) + (256*camera.zoom * 0.5)

  let distY = Math.max(camera.zoom,1) //higher = bad quality
  let distX = 1 //same as above, removes some columns and enables upscaling

  const halfZoom = camera.zoom*0.5
  const heightMult = camera.zoom/screen.height*256
  for(let x = Math.round(minX) ; x < Math.round(maxX); x+=distX){

    let maxH = Math.round(maxY);
    let first = true;
    
    for(let y = Math.round(maxY) ; y > Math.round(minY); y-=distY){

      const pos2D = new vec(x,y,0)

      if(isPointInQuadrilateral(pos2D,floor.projPoints)){

        const pos3D  = projectTo3D(pos2D)
        const pos3DRot = m.multiply(pos3D)

        const texX = Math.floor(remap(pos3DRot.x,-halfZoom,halfZoom,0,map.width))
        const texY = Math.floor(remap(pos3DRot.y,-halfZoom,halfZoom,0,map.width))
        const imageID = texY*map.width+texX;

        const scaledHeight =  Math.round(map.elevation[imageID]*heightMult)
        const top = Math.round(y)-scaledHeight
        
        if(top < -(maxH - top)+1){ //makes sure you don't draw above the top of the screen
          break
        }
        if(top < maxH){ //prevents overdraw
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

  for(let x = button.x; x<(button.x+button.width); x++){
    for(let y = button.y; y<(button.y+button.height); y++){
      drawPixel(x,y,255,255,255)
    }
  }

  const size = 3;

  const startX = button.x + size
  const startY = button.y + size
  drawN(startX,startY,3)
  drawE(startX + (size*5),startY,3)
  drawW(startX + (size*10),startY,3)

  drawI(startX + (size*1),startY+(size*6),3)
  drawM(startX + (size*4),startY+(size*6),3)
  drawG(startX + (size*10),startY+(size*6),3)

  updateScreen();
  camera.rotation.z -= 1/15

  times.push(new Date() - time)
  const timeMS = calculateAverage(times).toFixed(2)
  const fps = Math.round(1000/timeMS);
  console.log(
    timeMS + " ms \n" + 
    times.length + " frames \n" + 
    fps + " fps \n" +
    times[times.length-1] + " last image \n" +
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

  if(
    hoverX > button.x && 
    hoverX < button.x + button.width && 
    hoverY > button.y && 
    hoverY < button.y + button.height)
  {
    updateMap(Math.round(Math.random() * 1024),256)
  }
})