require("dotenv").config();
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser')
const cors = require('cors')
const port = process.env.PORT;
const app = express()
const server = http.createServer(app);
const Routes = require('./routes.js')

app.use([
    cors(),
    express.static("uploads"),
    bodyParser.json(),
    bodyParser.urlencoded({extended: false}),
    Routes
])

const io = (module.exports.io = require("socket.io")(server, {cors: {origin: '*'}}));
const socketManager = require('./socketManger/socketManager.js');
io.on("connection", socketManager);

server.listen(port,  () => {
    console.log(`Server is running on port ${port}`);
})