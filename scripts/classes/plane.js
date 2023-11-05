

class Matrix {
  constructor() {
    this.data = new Array(3).fill(0).map(() => new Array(3).fill(0));
  }

  rotation(X,Y,Z){
    const degX = degreesToRadians(X);
    const degY = degreesToRadians(Y);
    const degZ = degreesToRadians(Z);

    const cosX = Math.cos(degX);
    const cosY = Math.cos(degY);
    const cosZ = Math.cos(degZ);

    const sinX = Math.sin(degX);
    const sinY = Math.sin(degY);
    const sinZ = Math.sin(degZ);

    this.data[0] = [cosY*cosZ, -cosY*sinZ, sinZ]
    this.data[1] = [sinX*sinY*cosZ + cosX*sinZ,-sinX*sinY*sinZ + cosX*cosZ,-sinX*cosY]
    this.data[2] = [cosX*sinY*cosZ + sinX*sinZ,cosX*sinY*sinZ + sinX*cosZ,cosX*cosY]
  }

  multiply(vector){
    const X = vector.x * this.data[0][0] - vector.y * this.data[0][1] + vector.z * this.data[0][2];
    const Y = vector.x * this.data[1][0] - vector.y * this.data[1][1] + vector.z * this.data[1][2];
    const Z = vector.x * this.data[2][0] - vector.y * this.data[2][1] + vector.z * this.data[2][2];

    return new vec(X,Y,Z)
  }
}

/**
 * creates a new plane
 * @property {vec[]} projPoints
 */
class plane {
  constructor(posVec,rotVec,size,color){

    this.posVec = posVec;
    this.size = size;
    this.color = color;
    this.rotVec = rotVec;
    this.x0 = null;

    this.worldPoints = [];
    this.worldScale = [];
    this.worldRot = [];
    this.projPoints = [];

    this.m = null;

    this.everything()
  }



  everything(){
    const left = this.posVec.x - (0.5);
    const right = this.posVec.x + (0.5);
    const down = this.posVec.y - (0.5);
    const up = this.posVec.y + (0.5);

    this.m = new Matrix()
    this.m.rotation(this.rotVec.x,this.rotVec.y,this.rotVec.z)

    this.worldPoints = [
      new vec(left  ,down ,this.posVec.z),
      new vec(left  ,up   ,this.posVec.z),
      new vec(right ,up   ,this.posVec.z),
      new vec(right ,down ,this.posVec.z),
    ]

    this.worldScale = [
      vec.multiply(this.worldPoints[0],this.size),
      vec.multiply(this.worldPoints[1],this.size),
      vec.multiply(this.worldPoints[2],this.size),
      vec.multiply(this.worldPoints[3],this.size),
    ]

    this.worldRot = [
      this.m.multiply(this.worldScale[0]),
      this.m.multiply(this.worldScale[1]),
      this.m.multiply(this.worldScale[2]),
      this.m.multiply(this.worldScale[3]),
    ]

    this.projPoints = [
      new projectTo2D(this.worldRot[0]),
      new projectTo2D(this.worldRot[1]),
      new projectTo2D(this.worldRot[2]),
      new projectTo2D(this.worldRot[3])
    ]
  }
}

