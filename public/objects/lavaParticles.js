// https://multiplayer-scrolling-platformer-race.cldprv.repl.co
//Hello
function lavaParticle(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.initialY = y;
  this.width = w;
  this.height = h;
  this.displayX = this.x - scrollX;
  this.displayY = this.y - this.animationY - scrollY;
  //Speed Y of the particle
  this.sy = 0;
  //How many we add to the sy each time.
  this.adder = -1;
  //The function where I draw the particles.
  this.draw = () => {
    this.displayX = this.x - scrollX;
    this.displayY = this.y - scrollY;
    let gradient = drawingContext.createRadialGradient(this.displayX+this.width/2,this.displayY+this.height/2, 5,this.displayX+this.width/2, this.displayY+this.height/2, 30);
    gradient.addColorStop(0, colors.darkGreen+'ff');
    gradient.addColorStop(1,  '#11111100');
    drawingContext.fillStyle = gradient;
    noStroke()
    rect(this.displayX-50, this.displayY-50, 100, 100)
    drawingContext.fillStyle = "white";
    fill(colors.lightOrange)
    strokeWeight(4);
    stroke("#000");
    //rect(this.displayX, this.displayY, this.width, this.height);
  }
  //The function where I update the particles. 
  this.update = () => {
    this.sy -= this.adder;
    this.y -= this.sy;
    if(this.sy>10) {
      this.adder = 1;
    }
  }
}