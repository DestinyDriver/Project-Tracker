const express=require("express");
const socketio=require("socket.io");
const http=require("http");
const path= require("path");
require('dotenv').config();



const app=express();
const server=http.createServer(app);
const io= socketio(server);

const PORT=process.env.PORT||5000;

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));

io.on("connection",function(socket){
    socket.on("send-location",(data)=>{
        io.emit("rec-location",{id:socket.id,...data});
    });
    console.log('connected');

    socket.on("disconnect",()=>{
        io.emit("user-dis",socket.id);
    })
    
})



app.get('/',(req,res)=>{
    res.render("index");
    
})

server.listen(PORT,()=>{
    console.log(`app.js is running on ${PORT}`);
})


