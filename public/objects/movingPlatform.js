let movingPlatfroms = [];
function movingPlatform(x, y, w, h, maxSx, maxSy, xAdder, yAdder, nbFrames,color, bR) {
  this.x = x;
  this.y = y;
  this.displayX = this.x - scrollX;
  this.displayY = this.y - scrollY;
  this.width = w;
  this.height = h;
  this.maxSx = maxSx;//The max speed X of the platform
  this.maxSy = maxSy;
  this.sx = 0;//Speed x of player
  this.sy = 0;//Speed x of player
  this.xAdder = xAdder;//How much we add to his x-position each frame.
  this.yAdder = yAdder;//How much we add to his y-position each frame.
  this.nb = 0;
  this.nbFrames = nbFrames;
  this.color = color;
  this.borderRadius = bR;
  this.update = () => {
    console.log(this.x, this.sx)
    this.sx += this.xAdder;
    this.sy += this.yAdder;
    let a = false;
    if(this.sx>this.maxSx) {
      this.sx = this.maxSx;
      a = true;
    }
    if(this.sy>this.maxSy) {
      this.sy = this.maxSy;
      a = true;
    }
    if(this.sx<this.maxSx*-1) {
      this.sx = this.maxSx*-1;
      a = true;
    }
    if(this.sy<this.maxSy*-1) {
      this.sy = this.maxSy*-1;
      a = true;
    }
    if(a) {
      this.nb++;
    }
    if(this.nb>this.nbFrames) {
      this.xAdder = this.xAdder * -1;
      this.yAdder = this.yAdder * -1;
      this.nb = 0;
    }
    this.x += this.sx;
    if(collideRectRect(player.x, player.y, player.width, player.height, this.x, this.y, this.width, this.height)) {
      if(this.sx<0) {
        player.x = this.x-player.width-1;
        player.sx+=this.sx-1;
      }
      else {
        player.x = this.x+this.width+1;
        player.sx += this.sx+1;
      }
      
    }
    this.y += this.sy;
    this.displayX = this.x - scrollX;
    this.displayY = this.y - scrollY;
  }
  this.draw = () => {
    noStroke();
    fill(this.color);
    rect(this.displayX, this.displayY, this.width, this.height, this.borderRadius);
  }
}