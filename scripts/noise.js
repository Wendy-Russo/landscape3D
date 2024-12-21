function findClosestIndex(arr, targetValue) {
  let closestIndex = 0;
  let minDifference = Math.abs(arr[0] - targetValue);

  for (let i = 1; i < arr.length; i++) {
    const difference = Math.abs(arr[i] - targetValue);

    if (difference < minDifference) {
      minDifference = difference;
      closestIndex = i;
    }
  }

  return closestIndex;
}


function mulberry32(a) {
  var t = a += 0x6D2B79F5;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  return ((t ^ t >>> 14) >>> 0) / 4294967296;
}

function getTileKey(x, y, tileSize, seed) {
  return (x * map.width + y) + tileSize + seed;
}

function getTileHeight(key) {
  return map.profile[Math.floor(mulberry32(key) * map.profile.length)];
}

function smoothStep(t) {
  return t * t * (3 - 2 * t);
}

function octave(x, y, tileSize, seed, opacity) {
  const tileX = Math.floor(x / tileSize) + 1;
  const tileY = Math.floor(y / tileSize);

  const TOP_LEFT_TILE_KEY = getTileKey(tileX, tileY, tileSize, seed);
  const TOP_RIGHT_TILE_KEY = getTileKey(tileX + 1, tileY, tileSize, seed);
  const BOTTOM_LEFT_TILE_KEY = getTileKey(tileX, tileY + 1, tileSize, seed);
  const BOTTOM_RIGHT_TILE_KEY = getTileKey(tileX + 1, tileY + 1, tileSize, seed);

  const TOP_LEFT_TILE_HEIGHT = getTileHeight(TOP_LEFT_TILE_KEY);
  const TOP_RIGHT_TILE_HEIGHT = getTileHeight(TOP_RIGHT_TILE_KEY);
  const BOTTOM_LEFT_TILE_HEIGHT = getTileHeight(BOTTOM_LEFT_TILE_KEY);
  const BOTTOM_RIGHT_TILE_HEIGHT = getTileHeight(BOTTOM_RIGHT_TILE_KEY);

  let howFarAlongX = smoothStep((x % tileSize) / tileSize);
  let howFarAlongY = smoothStep((y % tileSize) / tileSize);

  const ID1 = findClosestIndex(map.profile, TOP_LEFT_TILE_HEIGHT * opacity);
  const ID2 = findClosestIndex(map.profile, TOP_RIGHT_TILE_HEIGHT * opacity);
  const ID3 = findClosestIndex(map.profile, BOTTOM_LEFT_TILE_HEIGHT * opacity);
  const ID4 = findClosestIndex(map.profile, BOTTOM_RIGHT_TILE_HEIGHT * opacity);

  const ID15 = lerp(ID1, ID2, howFarAlongX);
  const ID35 = lerp(ID3, ID4, howFarAlongX);
  const IDXX = lerp(ID15, ID35, howFarAlongY);

  const IDMin = Math.floor(IDXX);
  const IDMax = Math.ceil(IDXX);
  let idFac = smoothStep(IDXX - IDMin);

  return lerp(map.profile[IDMin], map.profile[IDMax], idFac);
}
  
function noise(x,y,seed,tileSize){
    
  let multiLevelNoise = 0;
  let opacity = 1;
  //let opacityDivide = 0;

  for(let i = 0 ; i < map.octaves; i++){
    const OCT_HEIGHT = octave(x,y,tileSize,seed,opacity);
    if(tileSize <= 1){
      break
    }

    //multiLevelNoise += OCT_HEIGHT;
    multiLevelNoise += remap(OCT_HEIGHT,0,255,-1,1);
    
    tileSize /= map.lacunarity;
    opacity *= map.persistance;
  }
  return multiLevelNoise
}

const tempArray = new Array(512,512);

function updateMap(seed,tileSize){
  for(let x = 0 ; x < 512; x++){
    for(let y = 0 ; y < 512; y++){
      const elevation = noise(x,y,seed,tileSize);
      tempArray[y*map.width+x] = elevation;
    }
  }

  let mapMin = Math.min(...tempArray)
  let mapMax = Math.max(...tempArray)
  for(let i = 0; i < tempArray.length; i++){
    map.elevation[i] = remap(tempArray[i],mapMin,mapMax,0,255);
  }

  for(let i = 0 ; i < map.elevation.length; i++){
    let H = map.elevation[i]
    let color = (H > map.waterHeight) ? map.landColor : map.waterColor
    let colorH = remap(H,0,255,127-64,127+64)
    const colR = overlay(colorH,color.x)
    const colG = overlay(colorH,color.y)
    const colB = overlay(colorH,color.z)
    //let height = map.elevation[i]
    map.color[i] = quickRGBtoHex(colR,colG,colB);
  }
}