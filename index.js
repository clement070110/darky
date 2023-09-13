// some imports
//const intersects = require('intersects');
const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const port = 3000;

const app = express();
const server = http.createServer(app);
const io = new socketio.Server(server);

//make console safe https://www.npmjs.com/package/safe-logging-replit
//const { makeConsoleSafe } = require('safe-logging-replit');
//makeConsoleSafe(console);


//Database (Used to store analytics)
const Database = require("@replit/database");
const db = new Database();
db.list().then(keys => {
  let areKeysAlreadyCreated = false;
  keys.forEach((element) => {
    if(element === "STATS_LAST_HOURS") {
      areKeysAlreadyCreated = true;
    }
  });
  if(!areKeysAlreadyCreated) {
    //Max nb persons on game simultanous
    db.set("STATS_LAST_HOURS", [0, 0, 0, 0, 0, 0]);
    let nowHour = Math.floor(Date.now() / 1000/60/60);
    db.set("STATS_LAST_HOURS_FROM_WHEN", [nowHour-5, nowHour-4, nowHour-3, nowHour-2, nowHour-1, nowHour])
  }
});
// uses static site from /public
app.use(express.static("public"));
app.use("/stats", express.static("stats"));
app.all('*', (req, res) => {
    res.sendFile(__dirname+"/404/404.html");
})

let players = {
  nb : 0,
  ids : [],
  x : [],
  y : [],
  xs : [],
  ys : [],
  usernames : []
};

function sendPos() {
  //console.clear();
  let key = Math.floor(Math.random()*100000);
  for(let i = 0;i<players.xs.length;i++) {
    if(typeof players.xs[i] === "undefined"|| typeof players.ys[i] === "undefined") {
      players.ids.splice(who, who+1);
      players.x.splice(who, who+1);
      players.y.splice(who, who+1);
      players.xs.splice(who, who+1);
      players.ys.splice(who, who+1);
      players.usernames.splice(who, who+1);
      players.nb--;

    }
    
  }
  io.sockets.emit("players",players, key);
  
}

setInterval(function (){
  sendPos();
},2000);
//Namespace for stats
const stats = io.of("/stats")

stats.on("connection", (socket) => {
  console.log("Someone connected on namespace stats")
  db.get("STATS_LAST_HOURS").then(value => {
    console.log(value)
    io.of("/stats").to(socket.id).emit("data", value, players.nb)
  });
});

//Game namespace
io.on("connect", function(socket) {
  players.nb++;
  players.ids.push(socket.id);
  players.x.push(100000000000);
  players.y.push(10000000);
  players.xs.push([0]);
  players.ys.push([0]);
  players.usernames.push("unknown");
  db.get("STATS_LAST_HOURS").then(value => {
    let nowHour = Math.floor(Date.now() / 1000/60/60);
    db.get("STATS_LAST_HOURS_FROM_WHEN").then(value2 => {
      if(value2[value2.length-1]<nowHour){
        value.splice(0, 1);
        value2.splice(0, 1);
        value.push(players.nb);
        value2.push(nowHour);
        db.set("STATS_LAST_HOURS", value);
        db.set("STATS_LAST_HOURS_FROM_WHEN", value2);
      }
      else if(players.nb>value[value.length-1]){
        value[value.length-1] = players.nb;
        db.set("STATS_LAST_HOURS", value);
      }
    });
  });
  socket.on("move", function(x, y, xs, ys, id, key){
    let who = players.ids.indexOf(id);
    players.x[who] = x;
    players.y[who] = y;
    players.xs[who] = xs;
    players.ys[who] = ys;
  });
  socket.on("username", function(u) {
    let who = players.ids.indexOf(socket.id);
    if(u.length < 16) {
      players.usernames[who] = u;
    }
  });
  socket.on('disconnect', function() {
    let who = players.ids.indexOf(socket.id);
    console.log(socket.id);
    players.ids.splice(who, who+1);
    players.x.splice(who, who+1);
    players.y.splice(who, who+1);
    players.xs.splice(who, who+1);
    players.ys.splice(who, who+1);
    players.usernames.splice(who, who+1);
    players.nb--;
  });
});

server.listen(port, function() {
  console.clear()
  console.log("🟢 " + port);
});