function projectTo2D(point) {
  // Convert x2D and y2D values from the range [-1, 1] to pixel coordinates
  const xPixel = remap(point.x, -1,1,0,screen.width);
  let yPixel = remap(point.y, -1,1,0,screen.height);

  //const centeredY = yPixel - ((screen.width-screen.height)/2) //y was unstreched down and needs to be re aligned

  return new vec(xPixel,yPixel,0);
}

function projectTo3D(pixelPoint) {
  // Convert pixel coordinates back to the range [-1, 1]

  /*const centeredY = pixelPoint.y+((screen.width-screen.height)/2) //y was unstreched down and needs to be re aligned

  const x2D = remap(pixelPoint.x,0,screen.width,-1,1)
  const y2D = remap(centeredY,0,screen.width,-1,1) */

  const x2D = remap(pixelPoint.x,0,screen.width,-1,1)
  const y2D = remap(pixelPoint.y,0,screen.height,-1,1) 

  return new vec(x2D, y2D, 0);
}

/**
 * Returns a boolean
 * @param {number} x - A variable contains a number
 * @param {number} y - A variable contains a string
 * @param {vec[]} quadVertices - A variable contains a boolean value
 */
function isPointInQuadrilateral(pos, quadVertices) {
  // Check if the point (x, y) is inside the quadrilateral defined by its vertices.
  // You can use a point-in-polygon algorithm for this.
  // This implementation assumes the vertices are in clockwise order.
  const d1 = (pos.x - quadVertices[0].x) * (quadVertices[1].y - quadVertices[0].y) - (pos.y - quadVertices[0].y) * (quadVertices[1].x - quadVertices[0].x);
  const d2 = (pos.x - quadVertices[1].x) * (quadVertices[2].y - quadVertices[1].y) - (pos.y - quadVertices[1].y) * (quadVertices[2].x - quadVertices[1].x);
  const d3 = (pos.x - quadVertices[2].x) * (quadVertices[3].y - quadVertices[2].y) - (pos.y - quadVertices[2].y) * (quadVertices[3].x - quadVertices[2].x);
  const d4 = (pos.x - quadVertices[3].x) * (quadVertices[0].y - quadVertices[3].y) - (pos.y - quadVertices[3].y) * (quadVertices[0].x - quadVertices[3].x);
  return (d1 >= 0 && d2 >= 0 && d3 >= 0 && d4 >= 0) || (d1 <= 0 && d2 <= 0 && d3 <= 0 && d4 <= 0);
}



function projectToText(screenPos,res,zoom,rotation){


  let to3D  = projectTo3D(screenPos)

  const unRot = undoRotate3DPoint(to3D,rotation)
  const unScale = vec.divide(unRot,zoom);


  return new vec(Math.floor(unScale.x*res),Math.floor(unScale.y*res))
}

function skewPoint(point, origin, skewX, skewY) {
  const dx = point.x - origin.x;
  const dy = point.y - origin.y;
  const skewedX = point.x + dx * skewY;
  const skewedY = point.y + dy * skewX;
  return { x: skewedX, y: skewedY };
}

