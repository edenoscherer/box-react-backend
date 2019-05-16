const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
const server = require('http').Server(app);
const io = require('socket.io')(server);
const routes = require('./routes');

io.on('connection', (socket) => {
  socket.on('connectRoom', (box) => {
    socket.join(box);
  });
});

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-zvrjq.mongodb.net/omnistack?retryWrites=true', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.io = io;
  return next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(routes);

server.listen(process.env.PORT || 3333);
