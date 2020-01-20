const express = require('express');
const path = require('path');
var socketIO = require('socket.io');
const app = express();
var count = 0;

var http = require('http');
var server = http.Server(app);
var io = socketIO(server);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api', (req, res) => {
  // Return them as json
  res.json(count);
  console.log(`Current button count ${count}`);
});

app.get('/api/data', (req, res) => {
    count++;
    // Return them as json
    res.json(count);
    console.log(`Current button count ${count}`);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// Add the WebSocket handlers
io.on('connection', function(socket) {
    console.log('a user connected');
});

setInterval(function() { io.sockets.emit('message', 'hi!'); }, 1000);

const port = process.env.PORT || 5000;
server.listen(port);
console.log(`Button game listening on ${port}`);