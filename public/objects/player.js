function managePlayers() {
  if(state === "play" && pState ==="play") {
    player.update();
    player.draw();
  }
  players.forEach(element => {
    element.update();
    element.draw();
  });
}

function Player(x, y, width, height, health, username) {
  this.username = username;
  this.x = x;
  this.y = y;
  this.displayX = this.x + scrollX;
  this.displayY = this.y + scrollY;
  //He's to envoy x and y
  this.toSendX = this.x;
  this.toSendY = this.y;
  //Speed X
  this.sx = 0;
  //Speed Y
  this.sy = 0;
  //Speed x'es to envoy to server.
  this.xs = [];
  //Speed Y'es to envoy to server.
  this.ys = [];
  //He's direction.
  this.direction = "right";
  //Health
  this.health = health;
  //Images width
  this.width = width;
  this.height = height;
  //For the multiplayer feature (view below).
  this.pX = this.x;
  this.pY = this.y;
  this.transparency = 255 - (2*(100 - this.health))
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
    this.transparency = 255 - (2*(100 - this.health))
    let gradient = drawingContext.createRadialGradient(this.displayX+this.width/2,this.displayY+this.height/2, 1,this.displayX+this.width/2, this.displayY+this.height/2, 140);
    gradient.addColorStop(0, '#ffffffff');
    gradient.addColorStop(1,  '#ffffff00');
    drawingContext.fillStyle = gradient;
    noStroke()
    rect(this.displayX-150, this.displayY-150, 380, 380)
    drawingContext.fillStyle = 'white';
    fill(colors.darkBlue+Math.round(this.transparency).toString(16))
    stroke(colors.darkBlue)
    strokeWeight(3)
    rect(this.displayX, this.displayY, this.width, this.height, 10);
    this.drawDirection();
    fill(100);
    strokeWeight(0)
    text("you", this.displayX+(this.width/2), this.displayY-8);
    noStroke();
    drawLava();
    drawLavaEffect();
  }
  this.update = () => {
    //For the multiplayer (pX stand for previous X)
    this.pX = this.x;
    this.pY = this.y;
    //Update the player's position.
    if(keyIsDown(LEFT_ARROW) || keyIsDown(65)||  (touches.length > 0 && touches[0].x<player.x-scrollX-(player.width/2)) ) {
      this.sx-=3;
      this.direction = "left";
    }
    if(keyIsDown(RIGHT_ARROW) || keyIsDown(68)|| (touches.length > 0 && touches[0].x>player.x-scrollX-(player.width/2))) {
      this.sx+=3;
      this.direction = "right";
    }
    
    
    if(keyIsDown(UP_ARROW) || keyIsDown(87) || (touches.length > 0 && touches[0].y<player.y-scrollY-this.height)) {
      //So we touch the platforms if we are on a platform
      this.y++;
      platforms.forEach((element) => {
        if(collideRectRect(this.x, this.y, this.width, this.height, element.x, element.y, element.width, element.height)) {
          this.sy = -38;
        }
      });
      movingPlatforms.forEach((element) => {
        if(collideRectRect(this.x, this.y, this.width, this.height, element.x, element.y, element.width, element.height)) {
          this.sy = -38;
        }
      });
      //We reset the y as before
      this.y--;
    }
   
    if(this.sx>0) {
      this.sx-=1;
    }
    if(this.sx<0) {
      this.sx+=1;
    }
    if(this.sy>0) {
      this.sy-=1;
    }
    if(this.sy<0) {
      this.sy+=1;
    }
    //Gravity
    this.sy+=2;
    //If he moves too fast
    if(this.sx>15) {
      this.sx=15;
    }
    if(this.sx<-15) {
      this.sx=-15;
    }
    if(this.sy>22) {
      this.sy=22;
    }
    if(this.sy<-45) {
      this.sy=-45;
    }
    //Collision detection
    //Wee add the speedX (sx)
    this.x+=this.sx;
    platforms.forEach((element) => {
      if(collideRectRect(this.x, this.y, this.width, this.height, element.x, element.y, element.width, element.height)) {
        if(this.sx>0) {
          this.x = element.x-this.width-1;
        }
        else if (this.sx<0) {
          this.x = element.x+element.width+1;
        }
        this.sx = 0;
      }
    });
    movingPlatforms.forEach((element) => {
      if(collideRectRect(this.x, this.y, this.width, this.height, element.x, element.y, element.width, element.height)) {
        if(this.sx>0) {
          this.x = element.x-this.width-1;
        }
        else if (this.sx<0) {
          this.x = element.x+element.width+1;
        }
        this.sx += element.sx;
      }
    });
    
    //We add the speedY(sy)
    this.y+=this.sy;
    platforms.forEach((element) => {
      if(collideRectRect(this.x, this.y, this.width, this.height, element.x, element.y, element.width, element.height)) {
        console.log(this.sy)
        if(this.sy>0) {
          this.y = element.y-this.height-1;
        }
        else if (this.sy<0) {
          this.y = element.y+element.height+1;
        }
        this.sy = 0;
      }
    });
    movingPlatforms.forEach((element) => {
      if(collideRectRect(this.x, this.y, this.width, this.height, element.x, element.y, element.width, element.height)) {
        console.log(this.sy)
        if(this.sy>0) {
          this.y = element.y-this.height-1;
        }
        else if (this.sy<0) {
          this.y = element.y+element.height+1;
        }
        this.sy = 0;
      }
    });
    //lava collision detection
    lavasPlatforms.forEach((element) => {
      if(collideRectRect(this.x, this.y, this.width, this.height, element.x, element.y, element.width, element.height)) {
        this.sy = -20;
        this.health-=25;
        this.y = element.y - element.animationY-this.height-1;
        if(element.animationYChanger>0) {
          this.y += element.animationYChanger+0.5;
        }
        else {
          this.y -= element.animationYChanger-0.5;
        }
      }
    });
    if(this.health<1) {
      this.health = 100;
      this.x = 400;
      this.y = 400;
      this.sx = 0;
      this.sy = 0;
    }
    //We regenerate the health
    if(this.health<100) {
      this.health+=0.07;
    }
    //Multiplayer
    this.xs.push(this.x-this.pX);
    this.ys.push(this.y-this.pY);
  }
}