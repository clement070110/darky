/*https://multiplayer-scrolling-platformer-race.cldprv.repl.co
Small mmo game made by @cldprv.
If you want to collaborate with me dm me on discord. (@cld).

|        |   |———————    |          |
|        |   |           |          |
|————————|   |——————     |          |
|        |   |           |          |
|        |   |———————    |———————   |———————   |

*/
let lavasPlatforms = []
function drawLavaEffect() {
  lavasPlatforms.forEach((element) => {
    element.drawEffect();
  });
}
function lavaPlatform(x, y, w, h, color, borderRadius) {
  this.x = x;
  this.y = y;
  this.displayX = this.x-scrollX;
  this.displayY = this.y-scrollY;
  //This is not used yet but may be used in the future.
  this.initialWidth = w;
  this.initialX = x;
  //This is used.
  this.initialHeight = h;
  this.initialY = y;
  this.width = w;
  this.height = h;
  this.color = color;
  this.borderRadius = borderRadius;
  this.animationY = 1;
  this.animationYChanger = 0;
  this.animationState = "up";//Can be "up" or "down".;
  //The particles of the lava's animation
  this.particles = [];
  this.update = () => {
    if(this.animationState === "up"){
      this.animationYChanger+=0.5;
      this.animationY += this.animationYChanger;
      if(this.animationYChanger>5) {
        this.animationState = "down";
      }
    }
    else if(this.animationState === "down"){
      this.animationY += this.animationYChanger;
      this.animationYChanger-=0.5;
      if(this.animationYChanger<-5.5) {
        this.animationState = "up";
      }
    }
    //this.y = this.y - this.animationY;
    this.displayX = this.x - scrollX;
    this.displayY = this.y - this.animationY - scrollY;
    //We add particles if a random number is equal to zero.
    if(Math.floor(Math.random()*Math.round(20/(this.width/40))) === 0) {
      let x = this.x+Math.floor(Math.random()*this.width);
      let tsdf = false;
      platforms.forEach((platform) => {
        if(collideRectRect(platform.x, platform.y, platform.width, platform.height, x, this.y, 20, 20)){
          tsdf = true;
        }
      });
      if(tsdf === false) {
        this.particles.push(new lavaParticle(x,this.y, 20, 20));
      }
      else {
        console.log("888")
      }
    }
      
    this.particles.forEach((element, index) => {
      element.update();
      element.draw();
      if(element.sy<-15) {
        this.particles.splice(index,index+1);
      }
    });
  }
  this.drawEffect = () => {
    noStroke();
    let gradient = drawingContext.createLinearGradient(this.displayX, this.displayY-80, this.displayX, this.displayY);
    gradient.addColorStop(0, '#11111100');
    gradient.addColorStop(1, colors.darkGreen +'ff');
    drawingContext.fillStyle = gradient;
    rect(this.displayX, this.displayY-80, this.width, 85, this.borderRadius)
    drawingContext.fillStyle = "white";
  }
  this.draw = () => {
    noStroke();
    fill(color);
    rect(this.displayX, this.displayY, this.width, this.height, this.borderRadius);
  }
}