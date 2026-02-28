import express from "express";
import { createServer } from 'http';
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import { dirname,join } from "path";

const app = express();
const server = createServer(app);
const io = new Server(server)
const allusers = {};

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static("public"));

app.get("/", (req,res)=>{
    console.log("GET request /");
    res.sendFile(join(__dirname + "/app/index.html"));
})

io.on("connection",(socket)=>{
    console.log(`Someone connected to socket server and socket id is ${socket.id}`);
    socket.on("join-user",username=>{
        console.log(`${username} joined socket connection`);
        allusers[username] = { username,id:socket.id };
        io.emit("joined", allusers);
    });
    socket.on("offer",(from,to,offer)=>{
        console.log({from,to,offer});
        io.to(allusers[to].id).emit("offer",offer);
    })
});

server.listen(9000,()=>{
    console.log(`Server listening on Port 9000`);
});
