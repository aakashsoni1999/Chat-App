const express=require('express');
const socketio=require('socket.io');
const http=require('http');

const app=express();
const server=http.createServer(app);
const io=socketio(server);

app.use('/',express.static(__dirname));

io.on('connection',(socket)=>{
    console.log('New connection formed with socket id='+socket.id);
    socket.emit('connected');

    socket.on('send_msg',(data)=>{
        socket.broadcast.emit('recv_msg',data);
    })
})

server.listen(1234,()=>{ console.log("Site open on port 1234")});