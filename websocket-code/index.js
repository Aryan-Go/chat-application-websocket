import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });
let user_count = 0;
let all_socket = [];
wss.on("connection", (socket) => {
    all_socket.push(socket);
    console.log("I am in")
    user_count = user_count+1;
    socket.send("user is connected " + user_count);
    socket.on("message", (e) => {
        for (let i = 0; i < all_socket.length; i++){
            all_socket[i].send(e.toString());
        }
    })
    socket.on("disconnect", () => {
        all_socket = all_socket.filter((s) => s != socket);
    })
})

