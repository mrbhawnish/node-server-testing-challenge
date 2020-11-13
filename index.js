const express = require("express");
const server = require("./api/server");

const port = process.env.PORT || 5000

server.listen(port, () => {
    console.log("API IS LISTENING ON PORT " + port)
})