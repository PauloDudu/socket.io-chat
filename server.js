const express = require('express');
const path = require('path');
const cors = require('cors');
const http = require('http');
const Server = require('socket.io');
const app = express();
const httpServer = http.createServer(app);

// const server = require('http').createServer(app);
// const io = require('socket.io')(server);
const io = new Server.Server(httpServer , {
    cors:{
      origin:"*"
    }
  })

app.use(express.static(path.join(__dirname, 'public')));
app.set('views',path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(cors());

app.use('/', (req, res) => {
    res.render('index.html')
})

let messages = [];

io.on('connection', socket => {
    console.log(`Socket conectado: ${socket.id}`);
    
    socket.emit('previousMessages', messages);
    
    socket.on('sendMessage', data => {
        messages.push(data);
        socket.broadcast.emit('recievedMessage', data);
    })
})

httpServer.listen(80, () => {
    console.log('Conectado!');
});