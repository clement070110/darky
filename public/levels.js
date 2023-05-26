function createLevel(l) {
  platforms = [];
  lavasPlatforms = [];
  movingPlatforms = [];
  lampadaires = [];
  if(l === 1) {
    //Floor
    platforms.push(new basicPlatform(200, 700, 500, 25, colors.black, 5));
    platforms.push(new basicPlatform(200, 800, 500, 800, colors.black, 5));
    platforms.push(new basicPlatform(200, 720, 500, 100, colors.black));
    platforms.push(new basicPlatform(600, 580, 100, 150, colors.black, 5))
    platforms.push(new basicPlatform(195, 380, 105, 150, colors.black, 5))
    platforms.push(new basicPlatform(-289, 190, 153, 100, colors.black, 5));
    //Floor light
    lampadaires.push(new lampadaire(280, 720, -100, 25, colors.white, 180))
    //Access to moving platforms light's
    lampadaires.push(new lampadaire(-240, 210, -100, 25, colors.green, 140));
    //The moving platform that give us acces to the others...
    movingPlatforms.push(new movingPlatform(-389, 190, 100, 40, 15, 8, -0.5, 0, 60, colors.green, 5));
    //The high platform that you must go over with movingPlatforms
    platforms.push(new basicPlatform(-2350, -550,500, 4500, colors.black, 5))
    lampadaires.push(new lampadaire(-1880, 500, 25, 150, colors.darkBlue, 200))
    lampadaires.push(new lampadaire(-1880, 200, 25, 150, colors.darkBlue, 200))
    lampadaires.push(new lampadaire(-1880, -100, 25, 150, colors.darkBlue, 200))
    lampadaires.push(new lampadaire(-1880, -400, 25, 180, colors.darkBlue, 200))

    //The lampadaire above this platform
    lampadaires.push(new lampadaire(-2000, -520, -300, 40, colors.darkBlue, 400))
    //The moving platforms of the above platform
    movingPlatforms.push(new movingPlatform(-1800, 0, 100, 40, 15, 8, 0.5, 0, 10, colors.green, 5));
    movingPlatforms.push(new movingPlatform(-1200, -190, 100, 40, 15, 8, -0.5, 0, 10, colors.green, 5));
    movingPlatforms.push(new movingPlatform(-1800, -380, 100, 40, 15, 8, 0.5, 0, 10, colors.green, 5))
    


  }
  //lava at bottom
  lavasPlatforms.push(new lavaPlatform(-6000, 820, 12000, 1200, colors.darkGreen));
}