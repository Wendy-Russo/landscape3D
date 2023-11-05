class vec {
  constructor(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;
  }

  static floor(){
    return new vec(Math.floor(this.x),Math.floor(this.y),Math.floor(this.z))
  }

  static add(vec1,vec2){
    return new vec(vec1.x+vec2.x,vec1.y+vec2.y,vec1.z+vec2.z)
  }

  static substract(vec1,vec2){
    return new vec(vec1.x-vec2.x,vec1.y-vec2.y,vec1.z-vec2.z)
  }

  static multiply(vec1,factor){
    return new vec(vec1.x*factor,vec1.y*factor,vec1.z*factor)
  }

  static divide(vec1,factor){
    return new vec(vec1.x/factor,vec1.y/factor,vec1.z/factor)
  }

  static round(vec1){
    return new vec(Math.round(vec1.x),Math.round(vec1.y),Math.round(vec1.z))
  }

  static lerp(vec1,vec2,factor){
    const lX = lerp(vec1.x,vec2.x,factor);
    const lY = lerp(vec1.y,vec2.y,factor);
    const lZ = lerp(vec1.z,vec2.z,factor);

    return new vec(lX,lY,lZ)
  }

  static magnitude(vec){
    return Math.sqrt( vec.x*vec.x + vec.y*vec.y + vec.z*vec.z )
  }

  static diff(vec1,vec2){
    return (Math.abs(vec1.x-vec2.x)+Math.abs(vec1.y-vec2.y)+Math.abs(vec1.z-vec2.z))/3
  }

  static distance(vec1,vec2){
    return vec.magnitude(vec.substract(vec2,vec1));
  }
}