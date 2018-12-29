const express=require('express');
const socketio=require('socket.io');
const http=require('http');

const app=express();
const server=http.createServer(app);
const io=socketio(server);

const server_port=process.env.PORT||1234

app.use('/',express.static(__dirname));

io.on('connection',(socket)=>{
    console.log('New connection formed with socket id='+socket.id);
    socket.emit('connected');

    socket.on('send_msg',(data)=>{
        socket.broadcast.emit('recv_msg',data);
    })
})

server.listen(server_port,()=>{ console.log("Site open on port 1234")});
