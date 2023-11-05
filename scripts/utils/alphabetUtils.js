

function drawN(x,y, size){
  drawSquare(x,y,size,size*5,quickRGBtoHex(0,0,0))
  
  drawSquare(x+size,y+size,size,size,quickRGBtoHex(0,0,0))
  drawSquare(x+(size*2),y+(size*2),size,size,quickRGBtoHex(0,0,0))
  
  drawSquare(x+(size*3),y,size,size*5,quickRGBtoHex(0,0,0))

}

function drawE(x,y, size){

  drawSquare(x,y,size,size*5,quickRGBtoHex(0,0,0))

  drawSquare(x+(size*1),y,size*3,size,quickRGBtoHex(0,0,0))
  
  drawSquare(x+(size*1),y+(size*2),size*2,size,quickRGBtoHex(0,0,0))
  
  drawSquare(x+(size*1),y+(size*4),size*3,size,quickRGBtoHex(0,0,0))

}


function drawW(x,y, size){
  drawSquare(x+(size*0),y,size,size*4,quickRGBtoHex(0,0,0))
  
  drawSquare(x+(size*1),y+(size*4),size,size,quickRGBtoHex(0,0,0))
  
  drawSquare(x+(size*2),y+(size*3),size,size,quickRGBtoHex(0,0,0))
  
  drawSquare(x+(size*3),y+(size*4),size,size,quickRGBtoHex(0,0,0))
  
  drawSquare(x+(size*4),y,size,size*4,quickRGBtoHex(0,0,0))
  
}

function drawI(x,y, size){

  drawSquare(x,y,size,size*5,quickRGBtoHex(0,0,0))
  
}

function drawM(x,y, size){

  drawSquare(x+(size*0),y+(size*0),size,size*5,quickRGBtoHex(0,0,0))
  
  
  drawSquare(x+(size*1),y+(size*1),size,size,quickRGBtoHex(0,0,0))

  drawSquare(x+(size*2),y+(size*2),size,size,quickRGBtoHex(0,0,0))

  drawSquare(x+(size*3),y+(size*1),size,size,quickRGBtoHex(0,0,0))

  drawSquare(x+(size*4),y,size,size*5,quickRGBtoHex(0,0,0))

}

function drawG(x,y, size){

  drawSquare(x+(size*0),y+(size*1),size,size*3,quickRGBtoHex(0,0,0))

  drawSquare(x+(size*1),y,size*3,size,quickRGBtoHex(0,0,0))
  drawSquare(x+(size*1),y+(size*4),size*2,size,quickRGBtoHex(0,0,0))

  drawSquare(x+(size*2),y+(size*2),size,size,quickRGBtoHex(0,0,0))

  drawSquare(x+(size*3),y+(size*2),size,size*3,quickRGBtoHex(0,0,0))
}

function drawPlay(x,y, size,col){

  drawSquare(x+(size*0),y+(size*0),size,size*5,quickRGBtoHex(col,col,col))
  
  drawSquare(x+(size*1),y+(size*1),size,size*3,quickRGBtoHex(col,col,col))
  

  drawSquare(x+(size*2),y+(size*2),size,size,quickRGBtoHex(col,col,col))
  
}

function drawPause(x,y, size,col){

  drawSquare(x+(size*0),y+(size*0),size,size*5,quickRGBtoHex(col,col,col))
  
  drawSquare(x+(size*2),y+(size*0),size,size*5,quickRGBtoHex(col,col,col))
  
  
}
/*
function drawI(x,y, size){

  drawSquare(x+(size*0),y+(size*0),size,size,quickRGBtoHex(0,0,0))
  drawSquare(x+(size*0),y+(size*1),size,size,quickRGBtoHex(0,0,0))
  drawSquare(x+(size*0),y+(size*2),size,size,quickRGBtoHex(0,0,0))
  drawSquare(x+(size*0),y+(size*3),size,size,quickRGBtoHex(0,0,0))
  drawSquare(x+(size*0),y+(size*4),size,size,quickRGBtoHex(0,0,0))
  
  drawSquare(x+(size*1),y+(size*0),size,size,quickRGBtoHex(0,0,0))
  drawSquare(x+(size*1),y+(size*1),size,size,quickRGBtoHex(0,0,0))
  drawSquare(x+(size*1),y+(size*2),size,size,quickRGBtoHex(0,0,0))
  drawSquare(x+(size*1),y+(size*3),size,size,quickRGBtoHex(0,0,0))
  drawSquare(x+(size*1),y+(size*4),size,size,quickRGBtoHex(0,0,0))

  drawSquare(x+(size*2),y+(size*0),size,size,quickRGBtoHex(0,0,0))
  drawSquare(x+(size*2),y+(size*1),size,size,quickRGBtoHex(0,0,0))
  drawSquare(x+(size*2),y+(size*2),size,size,quickRGBtoHex(0,0,0))
  drawSquare(x+(size*2),y+(size*3),size,size,quickRGBtoHex(0,0,0))
  drawSquare(x+(size*2),y+(size*4),size,size,quickRGBtoHex(0,0,0))

  drawSquare(x+(size*3),y+(size*0),size,size,quickRGBtoHex(0,0,0))
  drawSquare(x+(size*3),y+(size*1),size,size,quickRGBtoHex(0,0,0))
  drawSquare(x+(size*3),y+(size*2),size,size,quickRGBtoHex(0,0,0))
  drawSquare(x+(size*3),y+(size*3),size,size,quickRGBtoHex(0,0,0))
  drawSquare(x+(size*3),y+(size*4),size,size,quickRGBtoHex(0,0,0))

  drawSquare(x+(size*4),y+(size*0),size,size,quickRGBtoHex(0,0,0))
  drawSquare(x+(size*4),y+(size*1),size,size,quickRGBtoHex(0,0,0))
  drawSquare(x+(size*4),y+(size*2),size,size,quickRGBtoHex(0,0,0))
  drawSquare(x+(size*4),y+(size*3),size,size,quickRGBtoHex(0,0,0))
  drawSquare(x+(size*4),y+(size*4),size,size,quickRGBtoHex(0,0,0))
}*/