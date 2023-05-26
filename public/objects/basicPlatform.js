let platforms = []
function drawLava() {
  lavasPlatforms.forEach((element) => {
    element.update();
    element.draw();
  });
}
function drawMoving() {
  movingPlatforms.forEach((element) => {
    element.update();
    element.draw();
  });  
}
function drawBasic() {
  platforms.forEach((element) => {
    element.update();
    element.draw();
  });
}

function basicPlatform(x, y, w, h, color, borderRadius) {
  this.x = x;
  this.y = y;
  this.displayX = this.x-scrollX;
  this.displayY = this.y-scrollY;
  this.width = w;
  this.height = h;
  this.color = color;
  this.borderRadius = borderRadius;
  this.update = () => {
    this.displayX = this.x - scrollX;
    this.displayY = this.y - scrollY;
  }
  this.draw = () => {
    fill(color);
    noStroke();
    rect(this.displayX, this.displayY, this.width, this.height, this.borderRadius);
  }
}