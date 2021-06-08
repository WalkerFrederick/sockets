const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('<h1>index</h1>');
});

app.get('/requestPickup', (req, res) => {
    
    io.sockets.emit('pickupRequest', req.query.lotCode, "A user has requested pickup");

    res.status(200).send('success')
});

app.get('/pickup-notif', (req, res) => {
    res.send('<h1>index</h1>');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('location', (shuttleName, lotCdoe, newPos) => {
      console.log('NEW POS', shuttleName);
    });
    socket.on("pickupRequest", (arg1, arg2) => {
        console.log(arg1, arg2)
    });
});




server.listen(port, () => {
  console.log('listening on 3000');
});