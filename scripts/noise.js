function lerp(start, end, t) {
  // Ensure the factor 't' is within the valid range [0, 1]
  t = Math.max(0, Math.min(1, t));
  
  // Calculate the interpolated value
  return start + (end - start) * t;
}

function histogramMatch(inputArray, targetHistogram) {
  // Calculate histograms for both arrays
  const inputHistogram = getHistogramFromArray(inputArray);
  const currentCumulative = getCumulativeHistogram(inputHistogram);
  const targetCumulative = getCumulativeHistogram(targetHistogram);

  // Map input values to match the target histogram
  const matchedArray = inputArray.map((value) => {
    const currentPercentile = currentCumulative[value] / inputArray.length;
    const closestValue = findClosestValue(targetCumulative, currentPercentile);
    return closestValue;
  });

  return matchedArray;
}

function getHistogramFromArray(array) {
  const histogram = new Array(Math.max(...array) + 1).fill(0);
  array.forEach((value) => {
    histogram[value]++;
  });
  return histogram;
}

function getCumulativeHistogram(histogram) {
  const cumulative = [...histogram];
  for (let i = 1; i < cumulative.length; i++) {
    cumulative[i] += cumulative[i - 1];
  }
  return cumulative;
}

function findClosestValue(cumulativeHistogram, targetPercentile) {
  for (let value = 0; value < cumulativeHistogram.length; value++) {
    const currentPercentile = cumulativeHistogram[value] / cumulativeHistogram[cumulativeHistogram.length - 1];
    if (currentPercentile >= targetPercentile) {
      return value;
    }
  }
  return cumulativeHistogram.length - 1;
}

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
function applyBoxBlur(imageArray, width, height, windowSize) {
  const resultArray = new Array(imageArray.length);

  for (let i = 0; i < imageArray.length; i++) {
    const row = Math.floor(i / width);
    const col = i % width;

    let sum = 0;
    let count = 0;

    for (let r = Math.max(0, row - windowSize); r <= Math.min(height - 1, row + windowSize); r++) {
      for (let c = Math.max(0, col - windowSize); c <= Math.min(width - 1, col + windowSize); c++) {
        const index = r * width + c;
        sum += imageArray[index];
        count++;
      }
    }

    resultArray[i] = Math.round(sum / count);
  }

  return resultArray;
}

function mulberry32(a) {
  var t = a += 0x6D2B79F5;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  return ((t ^ t >>> 14) >>> 0) / 4294967296;
}

function hash(){
  
  state *= 25214903917
  state += 11
  state %= Math.pow(2,48)
  state /= Math.pow(2,48)
  return state
}

let cumulative = getCumulativeHistogram(map.ref)
  
function octave(x,y,tileSize,seed,opacity){

  const tileX = Math.floor(x/tileSize)+1;
  const tileY = Math.floor(y/tileSize);

  const TOP_LEFT_TILE_KEY = (tileX*map.width+tileY)+tileSize + seed;
  const TOP_RIGHT_TILE_KEY = ((tileX+1)*map.width+tileY)+tileSize + seed;
  const BOTTOM_LEFT_TILE_KEY = (tileX*map.width+(tileY+1))+tileSize + seed;
  const BOTTOM_RIGHT_TILE_KEY = ((tileX+1)*map.width+(tileY+1))+tileSize + seed;
  
  /* const TOP_LEFT_TILE_HEIGHT = mulberry32(TOP_LEFT_TILE_KEY)
  const TOP_RIGHT_TILE_HEIGHT = mulberry32(TOP_RIGHT_TILE_KEY)
  const BOTTOM_LEFT_TILE_HEIGHT = mulberry32(BOTTOM_LEFT_TILE_KEY);
  const BOTTOM_RIGHT_TILE_HEIGHT = mulberry32(BOTTOM_RIGHT_TILE_KEY);*/

  let TOP_LEFT_TILE_HEIGHT = 0;
  let TOP_RIGHT_TILE_HEIGHT = 0;
  let BOTTOM_LEFT_TILE_HEIGHT = 0;
  let BOTTOM_RIGHT_TILE_HEIGHT = 0;

  if(map.useLineAsHist){
    TOP_LEFT_TILE_HEIGHT = map.profile[Math.floor(mulberry32(TOP_LEFT_TILE_KEY)*map.profile.length)];
    TOP_RIGHT_TILE_HEIGHT = map.profile[Math.floor(mulberry32(TOP_RIGHT_TILE_KEY)*map.profile.length)];
    BOTTOM_LEFT_TILE_HEIGHT = map.profile[Math.floor(mulberry32(BOTTOM_LEFT_TILE_KEY)*map.profile.length)];
    BOTTOM_RIGHT_TILE_HEIGHT = map.profile[Math.floor(mulberry32(BOTTOM_RIGHT_TILE_KEY)*map.profile.length)];
  }else{
    TOP_LEFT_TILE_HEIGHT = getRandomValueFromHistogram(map.ref,mulberry32(TOP_LEFT_TILE_KEY));
    TOP_RIGHT_TILE_HEIGHT = getRandomValueFromHistogram(map.ref,mulberry32(TOP_RIGHT_TILE_KEY));
    BOTTOM_LEFT_TILE_HEIGHT = getRandomValueFromHistogram(map.ref,mulberry32(BOTTOM_LEFT_TILE_KEY));
    BOTTOM_RIGHT_TILE_HEIGHT = getRandomValueFromHistogram(map.ref,mulberry32(BOTTOM_RIGHT_TILE_KEY));
  }

  //const newH1 = Math.abs(remap(TOP_LEFT_TILE_HEIGHT,0,255,-255,255))
  //const newH2 = Math.abs(remap(TOP_RIGHT_TILE_HEIGHT,0,255,-255,255))
  //const newH3 = Math.abs(remap(BOTTOM_LEFT_TILE_HEIGHT,0,255,-255,255))
  //const newH4 = Math.abs(remap(BOTTOM_RIGHT_TILE_HEIGHT,0,255,-255,255))

  let arrXY = 0;

  let howFarAlongX = x%tileSize/tileSize
  let howFarAlongY = y%tileSize/tileSize

  howFarAlongX = Math.pow(howFarAlongX,2)*3 - Math.pow(howFarAlongX,3)*2
  howFarAlongY = Math.pow(howFarAlongY,2)*3 - Math.pow(howFarAlongY,3)*2

  if(map.strictness < 1){
    let arrX = lerp(TOP_LEFT_TILE_HEIGHT,TOP_RIGHT_TILE_HEIGHT,howFarAlongX)
    let arrX2 = lerp(BOTTOM_LEFT_TILE_HEIGHT,BOTTOM_RIGHT_TILE_HEIGHT,howFarAlongX)
    arrXY = lerp(arrX,arrX2,howFarAlongY)*opacity;
  }

  const ID1 = findClosestIndex(map.profile,TOP_LEFT_TILE_HEIGHT*opacity)
  const ID2 = findClosestIndex(map.profile,TOP_RIGHT_TILE_HEIGHT*opacity)

  const ID3 = findClosestIndex(map.profile,BOTTOM_LEFT_TILE_HEIGHT*opacity)
  const ID4 = findClosestIndex(map.profile,BOTTOM_RIGHT_TILE_HEIGHT*opacity)

  const ID15 = lerp(ID1,ID2,howFarAlongX)
  const ID35 = lerp(ID3,ID4,howFarAlongX)

  const IDXX = lerp(ID15,ID35,howFarAlongY)
  const IDMin = Math.floor(IDXX)
  const IDMax = Math.ceil(IDXX)
  let idFac = IDXX-IDMin

  idFac = Math.pow(idFac,2)*3 - Math.pow(idFac,3)*2

  const vvx2 = lerp(map.profile[IDMin],map.profile[IDMax],idFac)

  return lerp(arrXY,vvx2,map.strictness)
}
  
function noise(x,y,seed,tileSize){
    
  let multiLevelNoise = 0;
  let opacity = 1;
  //let opacityDivide = 0;

  for(let i = 0 ; i < map.octaves; i++){
    const OCT_HEIGHT = octave(x,y,tileSize,seed,opacity);
    if(tileSize < 2){
      break
    }

    multiLevelNoise += OCT_HEIGHT;

    tileSize /= map.lacunarity;
    opacity *= map.persistance;
  }
  return multiLevelNoise
}

const blue = nesCol[50] //GREEN 42
const green = nesCol[42] //GREEN 42
const watBlur = 4;
const watHei = 128;

let col = green;

const tempArray = new Array(512,512);

function updateMap(seed,tileSize){
  console.log("seed: " + seed)
  for(let x = 0 ; x < 512; x++){
    for(let y = 0 ; y < 512; y++){

      const elevation = noise(x,y,seed,tileSize);

      if(map.autoScale === true){
        tempArray[y*map.width+x] = elevation;

      }
      else{
        map.elevation[y*map.width+x] = elevation;
      }
    }
  }

  if(map.autoScale === true){
    let mapMin = Math.min(...tempArray)
    let mapMax = Math.max(...tempArray)
    for(let i = 0; i < tempArray.length; i++){
      let height = remap(tempArray[i],mapMin,mapMax,0,255);

      map.elevation[i] = height;
    }
  }

  //map.elevation = histogramMatch(map.elevation,map.ref)
  //map.elevation = applyBoxBlur(map.elevation,map.width,map.height,2)

  let landID = 39;
  let waterID = 6
  for(let i = 0 ; i < map.elevation.length; i++){
    let H = map.elevation[i]
    let colorH = H;
    let rightColor = waterID;
    if(H > map.waterHeight){
      rightColor = landID;
    }
    else{
      colorH = remap(colorH,0,map.waterHeight,map.waterHeight*0.5,map.waterHeight)
    }

    colorH = remap(colorH,0,255,100,255)
    const colR = overlay(colorH,nesCol[rightColor].x)
    const colG = overlay(colorH,nesCol[rightColor].y)
    const colB = overlay(colorH,nesCol[rightColor].z)
    //let height = map.elevation[i]
    map.color[i] = quickRGBtoHex(colR,colG,colB);
  }
}