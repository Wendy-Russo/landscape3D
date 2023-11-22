const width = 640;
const height = 480;
const elevationRes = 512;

const elev8 = new Uint8Array(elevationRes *elevationRes);
const colArr = new Uint32Array(width*height)

let imgIsReady = false;
const map = {
  width: 512,
  height: 512,
  waterHeight: -1,
  source: "../render3.png",
  elevation: null,
  color: null,
  ref: canyon,
  profile: nz3,
  heightMult: 0.3,
  tileSize: 128,
  octaves: 10,
  persistance: 0.5,
  lacunarity: 2,
  strictness: 1,
  sort: true,
  autoScale: true,
  soften: true,
  useLineAsHist: true
}

if(map.sort){
  map.profile.sort(function(a, b) {
    return a - b;
  });
}

if(map.soften){
  applyMedianFilter(map.profile)
  smoothHist(map.profile,2)
}

const screen = {
  width: 640,
  height:480,

  canvas: document.getElementById("canvas"),
  context: this.canvas.getContext("2d"),
  imgData: null,

  imgBuffer: null,
  buff8: null,
  buff32: null,
}

const camera = {
  rotation: {x:(35.2), y:0, z:45},
  zoom: 1,
  autoRotate : false
}

const button = {
  x:(screen.width-70),
  y:10,
  width:51,
  height:38,
}

const buttonStop = {
  x:(screen.width-70),
  y:3*17,
  width:3*9,
  height:3*7,
}

const buttonKal = {
  x:(screen.width-70),
  y:3*25,
  width:3*22,
  height:3*8,
}

const butAng1 = {
  x:(screen.width-(3*33)),
  y:3*30,
  width:3*8,
  height:3*8,
}

const butAng2 = {
  x:(screen.width-(3*22)),
  y:3*30,
  width:3*8,
  height:3*8,
}

const butAng3 = {
  x:(screen.width-(3*11)),
  y:3*30,
  width:3*8,
  height:3*8,
}

let isDragging = false;
let tempX = 0;
let tempZ = 0;
let startY = 0;
let startX = 0;

window.addEventListener("mousedown", (e) => {
  isDragging = true;
  tempX = camera.rotation.x;
  tempZ = camera.rotation.z;
  startY = e.offsetY;
  startX = e.offsetX;
})

window.addEventListener("mousemove", (e) => {
  if(isDragging){
    const distanceY = startY-e.offsetY;
    const distanceX = startX-e.offsetX;
    camera.rotation.x = tempX + (distanceY)/10;
    camera.rotation.z = tempZ + (distanceX)/10;
    camera.rotation.x = Math.min(camera.rotation.x,70);
    camera.rotation.x = Math.max(camera.rotation.x,0);
  }
})

window.addEventListener("mouseup", (e) => {
  isDragging = false
})

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
    const seed = Math.round(Math.random() * 1024 * 32)
    updateMap(seed,map.tileSize)
  }

  else if(isInRectangle(hoverX,hoverY,buttonStop))
  {
    camera.autoRotate = !camera.autoRotate
  }

})

const hexes = new Array(256);

for(let r = 0 ; r < 256; r++){
  hexes[r] = new Array(256)
  for(let g = 0 ; g < 256; g++){
    hexes[r][g] = new Uint32Array(256)
    for(let b = 0 ; b < 256; b++){
      hexes[r][g][b] = rgbToHex(r,g,b)
    }
  }
}

const nesCol = 
[
  new vec(254,254,254),  new vec(254,254,254), new vec(173,173,173), new vec(102,102,102),
  new vec(192,223,254),  new vec(100,175,254), new vec(26,96,217), new vec(0,46,135),
  new vec(211,210,254),  new vec(145,143,254), new vec(67,67,254), new vec(25,26,167),
  new vec(232,199,254),  new vec(197,119,254), new vec(117,45,255), new vec(61,3,163),
  new vec(251,194,254),  new vec(242,106,254), new vec(159,34,204), new vec(92,1,125),
  new vec(254,196,234),  new vec(253,110,204), new vec(182,35,123), new vec(109,0,66),
  new vec(254,204,197),  new vec(254,129,111), new vec(179,53,37), new vec(107,11,0),
  new vec(247,216,164),  new vec(234,157,39), new vec(151,80,0), new vec(87,34,0),
  new vec(228,229,148),  new vec(188,189,0), new vec(108,110,0), new vec(55,56,0),
  new vec(207,239,149),  new vec(137,216,0), new vec(60,134,60), new vec(21,74,0),
  new vec(189,245,169),  new vec(95,228,51), new vec(24,147,0), new vec(3,83,0),
  new vec(179,243,204),  new vec(73,224,129), new vec(8,143,53), new vec(1,66,79),

  new vec(180,235,243),  new vec(74,205,222), new vec(3,123,141), new vec(255,255,255),

  new vec(183,183,183),  new vec(80,80,80), new vec(0,0,0), new vec(0,0,0),
];

function quickRGBtoHex(r,g,b){
  return hexes[r][g][b]
}

function init(){
  screen.imgBuffer = new ArrayBuffer(screen.width*screen.height*4);
  screen.buff8 = new Uint8Array(screen.imgBuffer);
  screen.buff32 = new Uint32Array(screen.imgBuffer);
  screen.imgData = screen.context.createImageData(screen.width, screen.height);
  map.elevation = new Uint16Array(map.width*map.height)
  map.color = new Uint32Array(map.width*map.height)
}

function drawBackground(r,g,b){
  screen.buff32.fill(quickRGBtoHex(r,g,b));
}

function drawPixel(x,y,r,g,b){
  const color = quickRGBtoHex(r,g,b);
  const id = y*screen.width+x
  screen.buff32[id] = color;
}

function drawPixelHex(x,y,hex){
  const id = y*screen.width+x
  screen.buff32[id] = hex;
}

function DrawVerticalLine(x,y,height,r,g,b){
  for(let i = 0 ; i < height; i++){
    drawPixel(x,y+i,r,g,b)
  }
}

function DrawVerticalLineHEX(x,y,height,hex){
  for(let i = 0 ; i < height; i++){
    drawPixelHex(x,y+i,hex)
  }
}

function drawSquare(x,y,w,h,hex){
  for(let i = x ; i < x+w; i++){
    DrawVerticalLineHEX(i,y,h,hex)
  }
}

function updateScreen(){
  screen.imgData.data.set(screen.buff8);
  screen.context.putImageData(screen.imgData, 0, 0);
}

function drawUI(){
  //THIS IS DRAWING THE BUTTONS BACKGROUND
  for(let x = 500; x<screen.width; x++){
    for(let y = 0; y<screen.height; y++){
      if(isInRectangle(x,y,button) || 
        isInRectangle(x,y,buttonStop)
        //isInRectangle(x,y,butAng1) ||
        //isInRectangle(x,y,butAng2) ||
        //isInRectangle(x,y,butAng3)
      ){
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

  const semiOpaque = Math.round(255*0.6)
  if(camera.autoRotate){
    drawPlay(buttonStop.x + size*1,buttonStop.y + size * 1,size,0)
    drawPause(buttonStop.x + size*5,buttonStop.y + size * 1,size,semiOpaque)
  }else{
    drawPlay(buttonStop.x + size*1,buttonStop.y + size * 1,size,semiOpaque)
    drawPause(buttonStop.x + size*5,buttonStop.y + size * 1,size,0)
  }
}

function getRandomValueFromHistogram(histogram,random) {

  // Generate a random number between 0 and the total number of pixels
  const randomIndex = Math.floor(random * 512*512);

  // Find the brightness level corresponding to the random index
  let accumulatedPixels = 0;
  for (let brightness = 0; brightness < histogram.length; brightness++) {
    accumulatedPixels += histogram[brightness];

    // If the random index falls within the accumulated pixels, return the brightness level
    if (randomIndex < accumulatedPixels) {
      return brightness;
    }
  }

  // This should not happen, but in case of an issue, return the last brightness level
  return histogram.length - 1;
}

function getTerrainProfile(image) {
  const points = [];
  let minHeight = Infinity, maxHeight = -Infinity;
  let minPoint = { x: 0, y: 0 }, maxPoint = { x: 0, y: 0 };

  // Find the minimum and maximum heights and their corresponding points
  for (let x = 0; x < image.length; x++) {
    for (let y = 0; y < image[x].length; y++) {
      const height = image[x][y];
      if (height !== undefined && height !== NaN) {
        if (height < minHeight) {
          minHeight = height;
          minPoint = { x, y };
        }
        if (height > maxHeight) {
          maxHeight = height;
          maxPoint = { x, y };
        }
      }
    }
  }

  console.log(minHeight,minPoint,maxHeight,maxPoint)

  const slope = (maxPoint.y - minPoint.y) / (maxPoint.x - minPoint.x);

  // Determine the direction of iteration
  const stepX = maxPoint.x > minPoint.x ? 1 : -1;
  const stepY = maxPoint.y > minPoint.y ? slope : slope;

  // Iterate along the line and add pixel values to the array
  for (let x = minPoint.x; x !== maxPoint.x + stepX; x += stepX) {
    const y = minPoint.y + (x - minPoint.x) * stepY;
    points.push(image[Math.round(x)][Math.round(y)]);
  }
  console.log(minHeight,points[0],maxHeight,points[points.length-1])
  console.log(points)

  
  return points;
}

function dataFromImage(){
  //const hist = new Array(256).fill(0);
  let weirdHist =  new Array(512);
  let avgHist = []

  for(let x = 0 ; x < 512; x++){
    weirdHist[x] = []
  }

  let base_image = new Image();
  base_image.src = map.source;
  base_image.onload = () => {

    screen.context.drawImage(base_image, 0, 0,base_image.width,base_image.height);
    let DATA = screen.context.getImageData(0, 0,base_image.width,base_image.width).data;

    for(let x = 0 ; x < 512; x++){
      for(let y = 0 ; y < 480; y++){
        const height = Math.round(DATA[(y*512+x)*4])
        //hist[height] ++;
        weirdHist[x][y] = height;
      }
    }

    //console.log("histogram",hist)
    avgHist = getTerrainProfile(weirdHist)    

    /*avgHist.sort(function(a, b) {
      return a - b;
    });*/

  };

  return avgHist
};

init();

function getHistogramFromArray(array) {
  const histogram = new Array(Math.max(...array) + 1).fill(0);
  array.forEach((value) => {
    histogram[value]++;
  });
  return histogram;
}