const http = require("http");
const express = require('express');
const Spoiler = require("./model/spoiler");
const spoilersRoute = require('./routes/spoilers');
const { request, response } = require("express");
const sequelize = require('./database/database')

const app = express();

app.use(express.json())

app.use("/api" , spoilersRoute)

app.use((request, response, next) =>{
    response.status(404).send("teste1.0.1");
})

app.use((error, request, response, next) => {
    response.status(500).json({error});
})


sequelize.sync({force : true}).then(() => {
    const port = process.env.PORT || 3000

    app.set("port", port)

    const server = http.createServer(app)

    server.listen(port)
})