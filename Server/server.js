import express from 'express'
import cors from 'cors'
import { Server } from 'socket.io'
import http from 'http'

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "PUT"],
    },
})

io.on("connection", (socket) => {
    console.log("User connected with socket ID", socket.id);
    socket.on("join room", (data) => {
        socket.join(data);
        console.log("User - ", data.username, "with UserID", socket.id, "joined room with roomID - ", data.roomID)
    })// join room route
    socket.on("disconnect", () => {
        console.log("User disconnect with socket ID", socket.id);
    }) //disconnect route
});
app.use(cors())

server.listen(1000, () => console.log("server running on 1000"));