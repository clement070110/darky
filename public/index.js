const socket = io()
let player;
let gameStarted = false;
let level = 1;

let players = [];
let ids = [];

//element of total players
let nbDisplayer = document.getElementById("nbPlayers");
//Background music
let music;

function preload() {
  //Load music
  //soundFormats('mp3', 'ogg');
  //music = loadSound('/sounds/music')
  //music.setLoop(true)
}
let username = 'player' + Math.floor(Math.random() * 1000).toString();
console.log(username);

function setup() {
  //Setup canvas
  let cnv = createCanvas(settings.gameWidth, settings.gameHeight);
  cnv.parent('sketch-holder');
  frameRate(40);
  document.getElementById('sketch-holder').style.top = ((window.innerHeight-settings.gameHeight) / 2)-1 + 'px';
  document.getElementById('sketch-holder').style.left = ((window.innerWidth-settings.gameWidth) / 2) + 'px';
  document.getElementById('sketch-holder').style.transform='scale('+(window.innerHeight/settings.gameHeight)+')';
  //Setup objects
  player = new Player(400, 400, 64, 64, 100, username);
  //Setup levels
  createLevel(level);
  gameStarted = true;
  //Play music
  //music.play()
  if(localStorage.getItem("name")) {
    username = localStorage.getItem("name");
    document.getElementById("usernameInput").value = username;
  }
  let usernameInput = document.getElementById("usernameInput");
usernameInput.placeholder = username;
  //setup font
  textSize(20);
  textAlign(CENTER, CENTER);
}

let state = "menu";
let pState = "play";
function game() {
  background(colors.black)

  //scroll
  scrollX -= (scrollX - player.x + settings.viewWidth/2)/10;
  scrollY -= (scrollY - player.y+settings.viewHeight/2)/10;
  //Background
  manageLampadaires();
  managePlayers();
  drawMoving();
  drawBasic();
  
}
function closeMenu() {
	document.getElementById("title").style.display="none";
  let a = document.getElementById("connect");
  a.classList.remove("animation");
  a.offsetWidth;
  a.classList.add("animation");
  a.style.animation = "disappear 1.4s ease-in-out 1 forwards";
  let blurE = document.getElementById('sketch-holder');
  blurE.classList.remove('animation');
  blurE.offsetWidth;
  blurE.classList.add("animation");
  blurE.style.animation = "byeBlur 0.8s ease-in-out 1 forwards";
  /*let b = document.getElementById("back");
  b.classList.remove("animation");
  b.offsetWidth;
  b.classList.add("animation");
  b.style.animation = "appear 1.4s ease-in-out 1 forwards";*/
}
function openMenu() {
  let a = document.getElementById("connect");
  a.classList.remove("animation");
  a.offsetWidth;
  a.classList.add("animation");
  a.style.animation = "appear 0.7s ease-in-out 1 forwards";
  let blurE = document.getElementById('sketch-holder');
  blurE.classList.remove('animation');
  blurE.offsetWidth;
  blurE.classList.add("animation");
  blurE.style.animation = "blur 1.4s ease-in-out 1 forwards";
  /*
  let b = document.getElementById("back");
  if(b.style.visibility==="visible") {
    b.classList.remove("animation");
    b.offsetWidth;
    b.classList.add("animation");
    b.style.animation = "disappear 1.4s ease-in-out 1 forwards";
  }*/
}
let scrollAdder = 3;
/*
document.getElementById("back").addEventListener("click", ()=>{
  let b = document.getElementById("back");
  if(b.style.visibility==="visible") {
    state = "menu";
    alert("Okay")
  }
});*/
/*
document.getElementById("back").addEventListener("touchend", ()=>{
  let b = document.getElementById("back");
  if(b.style.visibility==="visible") {
    state = "menu";
    alert("Okay")
  }
});*/

function draw(){
  if(state === "play") {
    if(pState != 'play') {
      if(scrollX>-10 && scrollX<10) {
        pState = "play";
      }
      else{
        scrollX -= scrollX/30
        background(colors.black);
        drawLavaEffect();
        manageLampadaires();
        managePlayers();
        drawLava();
        drawMoving();
        drawBasic();
      }
      
    }
    else {
      game()
    }
  }
  else if(state === "menu"){
    background(colors.black)
    if(pState != 'menu') {
      scrollX = 0;
      scrollY = 40;
      pState = "menu";
      openMenu()
      document.getElementById("playButton").addEventListener("click", () => {
        closeMenu();
        if(!(document.getElementById("usernameInput").value==="")) {
        player.username = document.getElementById("usernameInput").value;     
        localStorage.setItem("name", player.username);
        }
        else {
          player.username = username;
        }
        state = "play";
        socket.emit("username", player.username);
      });
    }
    //scroll
    if(scrollX<-2000) {
      scrollAdder = scrollAdder*-1;
    }
    if(scrollX>200) {
      scrollAdder = scrollAdder*-1;
    }
    scrollX -= scrollAdder;
    drawLavaEffect();
    manageLampadaires();
    managePlayers();
    drawLava();
    drawMoving();
    drawBasic();
  }
}
//We count how many times he's alone, on the 30st(8s) time we show a message.
let alone = 0;
socket.on("players", function(ps, key) {
  if(document.readyState === 'ready' || document.readyState === 'complete') {
    nbDisplayer.innerHTML = `${ps.ids.length} online players`;
    if(ps.ids.length<2){
      alone++;
      if(alone===30) {
        let a = document.getElementById("alone");
        a.classList.remove("animation");
        a.offsetWidth;
        a.classList.add("animation");
        a.style.animation = "anim 40s ease-in-out 1";
      }
    }
    else {
      alone = 0;
    }
    for(let i = 0;i<ps.nb;i++) {
      if(ps.ids[i] === socket.id){
      //Nothing
      }
      else if(!ids.includes(ps.ids[i])) {
        players.push(new OtherPlayer(ps.x[i], ps.y[i],ps.xs[i], ps.ys[i], 100, ps.usernames[i]));
        ids.push(ps.ids[i]);
      }
      else {
        let who = ids.indexOf(ps.ids[i]);
        
        if(ps.xs.length===undefined || ps.ys.length === undefined) {
          console.log(ps);
          //alert("nooo")
        }
        else {
          players[who].xs = ps.xs[i];
          players[who].ys = ps.ys[i];
          players[who].username = ps.usernames[i];
          players[who].i = 0;
          players[who].nbNotHere = 0;
          players[who].x = ps.x[i];
          players[who].y = ps.y[i];
        }
      }
    }
    players.forEach((element) => {
      //We add 1 to nbNotHere, if it's greater than 200(5 seconds) we delete it.nbNotHere is reinitialised in socket.on("players") .
      element.nbNotHere++;
      if(element.nbNotHere>5) {
        element.disappear = true;
      }
    });
    if(gameStarted) {
      //Envoyé la data des positions
      socket.emit("move", player.toSendX, player.toSendY,player.xs, player.ys, socket.id, key);
      //Remettre la liste des vitesses a zero
      player.xs = [];
      player.ys = [];
      player.toSendX = player.x;
      player.toSendY = player.y;
    }
  }
}); 