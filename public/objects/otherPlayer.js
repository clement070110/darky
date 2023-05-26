function OtherPlayer(x, y, xs, ys, health, username) {
  this.xs = xs;
  this.ys = ys;
  this.i = 0;
  this.x = x;
  this.y = y;
  this.displayX = this.x-scrollX;
  this.displayY = this.y-scrollY;
  this.username = username;
  this.width = 64;
  this.height = 64;
  //After that nbNotHere is greater than 200 => We delete this player.
  this.disappear = false;
  this.nbNotHere = 0;
  this.health = health;
  this.direction = "right";
  this.update = () => {
    if(typeof this.xs === "undefined" || typeof this.ys === "undefined") {
      console.log("small, bug, but it must go away...")
    }
    else if(this.i>this.xs.length - 1) {
      console.log("hmmmm")
      this.x += this.xs[this.xs.length-1]/2;
      this.y += this.ys[this.ys.length-1]/2;
    }
    else {
      console.log("good", this.ys[this.i])
      this.x += this.xs[this.i];
      this.y += this.ys[this.i];
      if(this.xs[this.i]>0) {
        this.direction = "right";
      }
      if(this.xs[this.i]<0) {
        this.direction = "left";
      }
      this.i++;
    }
    if(this.disappear) {
      let who = players.indexOf(this);
      players.splice(who, who+1);
      ids.splice(who, who+1);
    }
    
  }
  this.drawDirection = () => {
    stroke(255, 255, 255);
    strokeWeight(6);
    if(this.direction === 'right') {
      line(this.displayX + this.width - 16, this.displayY +12, this.displayX + this.width - 16, this.displayY + this.width - 22);
    }
    if(this.direction === 'left') {
      line(this.displayX + 16, this.displayY +12, this.displayX + 16, this.displayY+this.height - 22);
    }
  }
  this.draw = () => {
    this.displayX = this.x-scrollX;
    this.displayY = this.y-scrollY;
    try {
      let gradient = drawingContext.createRadialGradient(this.displayX+this.width/2,this.displayY+this.height/2, 1,this.displayX+this.width/2, this.displayY+this.height/2, 140);
      gradient.addColorStop(0, '#ffffffff');
      gradient.addColorStop(1,  '#ffffff00');
      drawingContext.fillStyle = gradient;
      noStroke()
      rect(this.displayX-150, this.displayY-150, 380, 380)
      drawingContext.fillStyle = 'white';
    } catch (error) {
      console.log(error)
    }
    fill('#0099cc')
    rect(this.displayX, this.displayY, this.width, this.height, 10);
    this.drawDirection();
    fill(100);
    strokeWeight(0)
    text(this.username, this.displayX+(this.width/2), this.displayY-8);
  }
}