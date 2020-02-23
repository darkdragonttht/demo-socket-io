const express = require("express");
const app = express();
app.use(express.static("./public"));
app.set("view engine", "ejs");
app.set("views", "./views");

const server = require("http").Server(app);
const io = require("socket.io")(server);
server.listen(3000, function () {
    console.log('listen port 3000');
});

io.on("connection", function (socket) {
    console.log('có người kết nối ' + socket.id);
    socket.on("disconnect", function() {
        console.log('ngắt kết nối ' + socket.id);
    });

    socket.on("client-send-data", function(data) {
        //io.sockets.emit gửi lên server và tất cả nhận được
        //socket.emit gửi lên server và chỉ mình nhận được
        //socket.broadcasr.emit gửi lên server nhưng bản thân không nhận được
        //io.to("socket.id").emit gửi lên server, chỉ mình và id người nghe nhận được
        socket.broadcast.emit("server-send-data", data);
    });
});

app.get("/", function(req, res) {
    res.render("trangchu");
});