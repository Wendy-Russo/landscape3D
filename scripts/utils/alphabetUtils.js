

function drawN(x,y, size){
  drawSquare(x,y+(size*4),size,size,rgbToHex(0,0,0))
  drawSquare(x,y+(size*3),size,size,rgbToHex(0,0,0))
  drawSquare(x,y+(size*2),size,size,rgbToHex(0,0,0))
  drawSquare(x,y+size,size,size,rgbToHex(0,0,0))
  drawSquare(x,y,size,size,rgbToHex(0,0,0))

  drawSquare(x+size,y+size,size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*2),y+(size*2),size,size,rgbToHex(0,0,0))

  drawSquare(x+(size*3),y+(size*4),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*3),y+(size*3),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*3),y+(size*2),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*3),y+size,size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*3),y,size,size,rgbToHex(0,0,0))
}

function drawE(x,y, size){
  drawSquare(x,y+(size*4),size,size,rgbToHex(0,0,0))
  drawSquare(x,y+(size*3),size,size,rgbToHex(0,0,0))
  drawSquare(x,y+(size*2),size,size,rgbToHex(0,0,0))
  drawSquare(x,y+size,size,size,rgbToHex(0,0,0))
  drawSquare(x,y,size,size,rgbToHex(0,0,0))

  drawSquare(x+(size*1),y+(size*0),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*2),y+(size*0),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*3),y+(size*0),size,size,rgbToHex(0,0,0))
  
  drawSquare(x+(size*1),y+(size*2),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*2),y+(size*2),size,size,rgbToHex(0,0,0))
  
  drawSquare(x+(size*1),y+(size*4),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*2),y+(size*4),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*3),y+(size*4),size,size,rgbToHex(0,0,0))
}

function drawE(x,y, size){
  drawSquare(x,y+(size*4),size,size,rgbToHex(0,0,0))
  drawSquare(x,y+(size*3),size,size,rgbToHex(0,0,0))
  drawSquare(x,y+(size*2),size,size,rgbToHex(0,0,0))
  drawSquare(x,y+size,size,size,rgbToHex(0,0,0))
  drawSquare(x,y,size,size,rgbToHex(0,0,0))

  drawSquare(x+(size*1),y+(size*0),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*2),y+(size*0),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*3),y+(size*0),size,size,rgbToHex(0,0,0))
  
  drawSquare(x+(size*1),y+(size*2),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*2),y+(size*2),size,size,rgbToHex(0,0,0))
  
  drawSquare(x+(size*1),y+(size*4),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*2),y+(size*4),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*3),y+(size*4),size,size,rgbToHex(0,0,0))
}

function drawW(x,y, size){
  drawSquare(x+(size*0),y+(size*3),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*0),y+(size*2),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*0),y+(size*1),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*0),y+(size*0),size,size,rgbToHex(0,0,0))
  
  drawSquare(x+(size*1),y+(size*4),size,size,rgbToHex(0,0,0))
  
  drawSquare(x+(size*2),y+(size*3),size,size,rgbToHex(0,0,0))
  
  drawSquare(x+(size*3),y+(size*4),size,size,rgbToHex(0,0,0))

  drawSquare(x+(size*4),y+(size*3),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*4),y+(size*2),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*4),y+(size*1),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*4),y+(size*0),size,size,rgbToHex(0,0,0))
  
}

function drawI(x,y, size){

  drawSquare(x+(size*1),y+(size*0),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*1),y+(size*1),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*1),y+(size*2),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*1),y+(size*3),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*1),y+(size*4),size,size,rgbToHex(0,0,0))
}

function drawM(x,y, size){

  drawSquare(x+(size*0),y+(size*0),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*0),y+(size*1),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*0),y+(size*2),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*0),y+(size*3),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*0),y+(size*4),size,size,rgbToHex(0,0,0))
  
  //drawSquare(x+(size*1),y+(size*0),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*1),y+(size*1),size,size,rgbToHex(0,0,0))
  //drawSquare(x+(size*1),y+(size*2),size,size,rgbToHex(0,0,0))
  //drawSquare(x+(size*1),y+(size*3),size,size,rgbToHex(0,0,0))
  //drawSquare(x+(size*1),y+(size*4),size,size,rgbToHex(0,0,0))

  //drawSquare(x+(size*2),y+(size*0),size,size,rgbToHex(0,0,0))
  //drawSquare(x+(size*2),y+(size*1),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*2),y+(size*2),size,size,rgbToHex(0,0,0))
  //drawSquare(x+(size*2),y+(size*3),size,size,rgbToHex(0,0,0))
  //drawSquare(x+(size*2),y+(size*4),size,size,rgbToHex(0,0,0))

  //drawSquare(x+(size*3),y+(size*0),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*3),y+(size*1),size,size,rgbToHex(0,0,0))
  //drawSquare(x+(size*3),y+(size*2),size,size,rgbToHex(0,0,0))
  //drawSquare(x+(size*3),y+(size*3),size,size,rgbToHex(0,0,0))
  //drawSquare(x+(size*3),y+(size*4),size,size,rgbToHex(0,0,0))

  drawSquare(x+(size*4),y+(size*0),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*4),y+(size*1),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*4),y+(size*2),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*4),y+(size*3),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*4),y+(size*4),size,size,rgbToHex(0,0,0))
}

function drawG(x,y, size){

  //drawSquare(x+(size*0),y+(size*0),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*0),y+(size*1),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*0),y+(size*2),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*0),y+(size*3),size,size,rgbToHex(0,0,0))
  //drawSquare(x+(size*0),y+(size*4),size,size,rgbToHex(0,0,0))
  
  drawSquare(x+(size*1),y+(size*0),size,size,rgbToHex(0,0,0))
  //drawSquare(x+(size*1),y+(size*1),size,size,rgbToHex(0,0,0))
  //drawSquare(x+(size*1),y+(size*2),size,size,rgbToHex(0,0,0))
  //drawSquare(x+(size*1),y+(size*3),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*1),y+(size*4),size,size,rgbToHex(0,0,0))

  drawSquare(x+(size*2),y+(size*0),size,size,rgbToHex(0,0,0))
  //drawSquare(x+(size*2),y+(size*1),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*2),y+(size*2),size,size,rgbToHex(0,0,0))
  //drawSquare(x+(size*2),y+(size*3),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*2),y+(size*4),size,size,rgbToHex(0,0,0))

  drawSquare(x+(size*3),y+(size*0),size,size,rgbToHex(0,0,0))
  //drawSquare(x+(size*3),y+(size*1),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*3),y+(size*2),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*3),y+(size*3),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*3),y+(size*4),size,size,rgbToHex(0,0,0))

}

/*
function drawI(x,y, size){

  drawSquare(x+(size*0),y+(size*0),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*0),y+(size*1),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*0),y+(size*2),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*0),y+(size*3),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*0),y+(size*4),size,size,rgbToHex(0,0,0))
  
  drawSquare(x+(size*1),y+(size*0),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*1),y+(size*1),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*1),y+(size*2),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*1),y+(size*3),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*1),y+(size*4),size,size,rgbToHex(0,0,0))

  drawSquare(x+(size*2),y+(size*0),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*2),y+(size*1),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*2),y+(size*2),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*2),y+(size*3),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*2),y+(size*4),size,size,rgbToHex(0,0,0))

  drawSquare(x+(size*3),y+(size*0),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*3),y+(size*1),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*3),y+(size*2),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*3),y+(size*3),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*3),y+(size*4),size,size,rgbToHex(0,0,0))

  drawSquare(x+(size*4),y+(size*0),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*4),y+(size*1),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*4),y+(size*2),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*4),y+(size*3),size,size,rgbToHex(0,0,0))
  drawSquare(x+(size*4),y+(size*4),size,size,rgbToHex(0,0,0))
}*/