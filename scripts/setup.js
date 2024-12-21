const width = 640;
const height = 480;
const elevationRes = 512;

const elev8 = new Uint8Array(elevationRes *elevationRes);
const colArr = new Uint32Array(width*height)

const nesCol = 
[
  new vec(254,254,254),  
  new vec(254,254,254), 
  new vec(173,173,173), 
  new vec(102,102,102),
  new vec(192,223,254),  
  new vec(100,175,254), 
  new vec(26,96,217), 
  new vec(0,46,135),
  new vec(211,210,254),  
  new vec(145,143,254), 
  new vec(67,67,254), 
  new vec(25,26,167),
  new vec(232,199,254),  
  new vec(197,119,254), 
  new vec(117,45,255), 
  new vec(61,3,163),
  new vec(251,194,254),  
  new vec(242,106,254), 
  new vec(159,34,204), 
  new vec(92,1,125),
  new vec(254,196,234),  
  new vec(253,110,204), 
  new vec(182,35,123), 
  new vec(109,0,66),
  new vec(254,204,197),  
  new vec(254,129,111), 
  new vec(179,53,37), 
  new vec(107,11,0),
  new vec(247,216,164),  
  new vec(234,157,39), 
  new vec(151,80,0), 
  new vec(87,34,0),
  new vec(228,229,148),  
  new vec(188,189,0), 
  new vec(108,110,0), 
  new vec(55,56,0),
  new vec(207,239,149),  
  new vec(137,216,0), 
  new vec(60,134,60), 
  new vec(21,74,0),
  new vec(189,245,169),  
  new vec(95,228,51), 
  new vec(24,147,0), 
  new vec(3,83,0),
  new vec(179,243,204),  
  new vec(73,224,129), 
  new vec(8,143,53), 
  new vec(1,66,79),
  new vec(180,235,243),  
  new vec(74,205,222), 
  new vec(3,123,141), 
  new vec(255,255,255),
  new vec(183,183,183),  
  new vec(80,80,80), 
  new vec(0,0,0), 
  new vec(0,0,0),
];

let imgIsReady = false;
const profiles = {
  Canyon:{
    data : canyonProfile,
    landColor : nesCol[30],
    waterColor : nesCol[45],
    waterHeight : 32,
    octaves: 1,
  },
  Canyon2:{
    data : canyon2Profile,
    landColor : nesCol[26],
    waterColor : nesCol[47],
    waterHeight : 32,
    octaves: 1,
  },
  Fuji:{
    data : fujiProfile,
    landColor : nesCol[43],
    waterColor : nesCol[49],
    waterHeight : 8,
    octaves: 1,
  },
  Monument:{
    data : monumentProfile,
    landColor : nesCol[29],
    waterColor : nesCol[45],
    waterHeight : 4,
    octaves: 4,
  },
  South:{
    data : southProfile.sort((a,b) => a-b),
    landColor : nesCol[42],
    waterColor : nesCol[49],
    waterHeight : 8,
    octaves: 32,
  },
}

const map = {
  width: 512,
  height: 512,
  waterHeight: 0,
  profile: canyonProfile,
  landColor:nesCol[30],
  waterColor:nesCol[45],
  heightMult: 0.3,
  tileSize: 128,
  octaves: 1,
  persistance: 0.5,
  lacunarity: 2,
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

const d = profiles[document.getElementById("shapeSelect").value]
map.profile = d.data;
map.landColor = d.landColor;
map.waterColor = d.waterColor;
map.waterHeight = d.waterHeight;
map.octaves = d.octaves;

const camera = {
  rotation: {x:(35.2), y:0, z:45},
  zoom: 1,
  autoRotate : false
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

document.getElementById("shapeSelect")
  .addEventListener("change", (e) => {
    const d = profiles[e.target.value]

    map.profile = d.data;
    map.landColor = d.landColor;
    map.waterColor = d.waterColor;
    map.waterHeight = d.waterHeight;
    map.octaves = d.octaves;

    updateMap(new Date().getMilliseconds(),map.tileSize)
  })


document.getElementById("resetButton")
  .addEventListener("click", (e) => {
  updateMap(new Date().getMilliseconds(),map.tileSize)
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

function init(){
  screen.imgBuffer = new ArrayBuffer(screen.width*screen.height*4);
  screen.buff8 = new Uint8Array(screen.imgBuffer);
  screen.buff32 = new Uint32Array(screen.imgBuffer);
  screen.imgData = screen.context.createImageData(screen.width, screen.height);
  map.elevation = new Uint16Array(map.width*map.height)
  map.color = new Uint32Array(map.width*map.height)
}

function quickRGBtoHex(r,g,b){
  return hexes[r][g][b]
}

function drawBackground(r,g,b){
  screen.buff32.fill(quickRGBtoHex(r,g,b));
}

function drawPixelHex(x,y,hex){
  const id = y*screen.width+x
  screen.buff32[id] = hex;
}

function DrawVerticalLineHEX(x,y,height,hex){
  for(let i = 0 ; i < height; i++){
    drawPixelHex(x,y+i,hex)
  }
}

function updateScreen(){
  screen.imgData.data.set(screen.buff8);
  screen.context.putImageData(screen.imgData, 0, 0);
}

init();
