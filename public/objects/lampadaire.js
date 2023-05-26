let lampadaires = []
function manageLampadaires() {
  lampadaires.forEach((element) => {
    element.update();
    element.draw();
  });
}

function lampadaire(x, y, h, w, color, radius) {
  this.x = x;
  this.y = y;
  this.height = h;
  this.width = w;
  this.color = color;
  this.radius = radius;
  this.displayX = this.x-scrollX;
  this.displayY = this.y-scrollY;
  this.update = () => {
    this.displayX = this.x-scrollX;
    this.displayY = this.y-scrollY;
  }
  this.draw = () => {
    let gradient;
    if(Math.abs(this.height)>Math.abs(this.width)){
      gradient = drawingContext.createRadialGradient(this.displayX+this.width/2,this.displayY+this.height, 5,this.displayX+this.width/2, this.displayY+this.height, this.radius);
    }
    else {
      gradient = drawingContext.createRadialGradient(this.displayX+this.width,this.displayY+this.height/2, 5,this.displayX+this.width, this.displayY+this.height/2, this.radius);
    }
    gradient.addColorStop(0, this.color+'ff');
    gradient.addColorStop(1,  this.color+'00');
    drawingContext.fillStyle = gradient;
    rect(this.displayX-this.radius-500, this.displayY+this.height-this.radius -500, this.radius*2+1000, this.radius*2+1000);
    drawingContext.fillStyle = '#111';
    fill(colors.black)
    console.log(this.height, this.width)
    if(Math.abs(this.height)>Math.abs(this.width)) {
      rect(this.displayX, this.displayY, this.width, this.height, Math.abs(this.width)/2);
    }
    else {
      rect(this.displayX, this.displayY, this.width, this.height, Math.abs(this.height)/2);
    }
  }
}