const express = require('express');
const socket = require('socket.io');

const app = express();



const server = app.listen((process.env.PORT || 3000), function() {
  console.log('Listening on port 3000')
});

let io = socket(server);


app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/home.html')
});

app.get('/broadcaster-1', function (req, res) {
  res.sendFile(__dirname + '/public/broadcaster-1.html')
});

app.get('/broadcaster-2', function (req, res) {
  res.sendFile(__dirname + '/public/broadcaster-2.html')
});

app.get('/receiver-1', function(req, res) {
  res.sendFile(__dirname + '/public/receiver-1.html');
});

app.get('/receiver-2', function (req, res) {
  res.sendFile(__dirname + '/public/receiver-2.html');
});

app.get('/gui-control-broadcaster-1', function (req, res) {
  res.sendFile(__dirname + '/public/gui-control-broadcaster-1.html');
});

app.get('/gui-control-receiver-1', function (req, res) {
  res.sendFile(__dirname + '/public/gui-control-receiver-1.html');
});


io.on('connection', function(socket) {
  console.log('Made socket connection', socket.id);
  socket.on('midiTransport-1', function(data) {
    io.sockets.emit('midiTransport-1', data)
  });
  socket.on('midiTransport-2', function (data) {
    io.sockets.emit('midiTransport-2', data)
  });
});