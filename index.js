const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

let count = 0;
let count_disconenct = 0;
io.on('connection', (socket) => {
  console.log(`socket ${socket.id} was connected!, count ${count++}`)
  socket.on('disconnect', ()=>{
     console.log(`socket ${socket.id} was disconnected!, count ${count_disconenct++} !!!`)
  });	

  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
