

function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function radiantsToDegrees(degrees) {
  return degrees*180/Math.PI;
}

/**
 * Returns the value, mapped to the minimum and maximum
 * @param {number} value 
 * @param {number} min 
 * @param {number} max 
 * @returns 
 */
function minMax(value,min,max){

  if(value<min){
    return min
  }
  else if(value > max){
    return max
  }
  else{
    return value
  }
}

function calculateDistance(x1, y1, x2, y2) {
  const deltaX = x2 - x1;
  const deltaY = y2 - y1;
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

function remap(value,low1,high1,low2,high2){  
  return ((value-low1)/(high1-low1))*(high2-low2)+low2;
}

function calculateAverage(arr) {
  if (arr.length === 0) {
    return 0; // Avoid division by zero for empty arrays
  }

  const sum = arr.reduce((total, currentValue) => total + currentValue, 0);
  return sum / arr.length;
}

function lerp (value1, value2, factor){
  return (((1-factor)*value1) + (factor*value2));
}

function smoothstep(t) {
  // Smoothstep interpolation function
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  return t * t * (3 - 2 * t);
}

function calculate2DDistance(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance;
}

function componentToHex(c) {
  
  if(c === 0){
    return "00"
  }
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "0xFF" + componentToHex(b) + componentToHex(g) + componentToHex(r);
}

function overlay(base,top){
  const baseFloat = base/255;
  const topFloat = top/255;

  if(baseFloat < 0.5){
    const floatOverlay = 2*baseFloat*topFloat
    return Math.round(floatOverlay * 255)
  }
  else{
    const floatOverlay =  1 - (2 * (1-baseFloat)*(1-topFloat) )
    return Math.round(floatOverlay * 255)
  }
}

function roundPrecise(number,decimals){
  const divider = Math.pow(decimals,10)
  return Math.round(number*divider)/divider
}