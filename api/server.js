const express = require('express');
const { findById } = require('../resources/resource-model');
const ResourceDb = require("../resources/resource-model");

const server = express();


server.use(express.json());


server.get("/", (req, res) => {
    res.status(200).json({ api: "up" })

});

server.get("/resources", async (req, res) => {
    const allResources = await ResourceDb.getAll()
    res.status(200).json(allResources)
})
server.get("/resources/:id", async (req, res) => {
    const resource = await ResourceDb.findById(req.params.id)
    res.status(200).json(resource)

});
server.post("/resources", async (req, res) => {
    const newResource = { name: req.body.name }
    const createdResource = await ResourceDb.create(newResource)
    res.status(200).json(createdResource)
})

server.delete("/:id", async (req, res) => {
     const itemToDelete = await findById(req.params.id)

     if(!itemToDelete){
        res.status(404).json({ message: "item not found" })
     }
     
     res.status(200).json({itemToDelete})
     await ResourceDb.remove(req.params.id)
})

module.exports = server




