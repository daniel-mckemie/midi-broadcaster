const express = require('express');
const socket = require('socket.io');

const app = express();



const server = app.listen((process.env.PORT || 8000), function() {
  console.log('Listening on port 3000')
});

let io = socket(server);


app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/host.html')
});

app.get('/receiver', function(req, res) {
  res.sendFile(__dirname + '/public/receiver.html');
});

io.on('connection', function(socket) {
  console.log('Made socket connection', socket.id);
  socket.on('midiTransport', function(data) {
    io.sockets.emit('midiTransport', data)
  }); 
});