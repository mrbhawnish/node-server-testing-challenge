const db = require('../data/connection');

module.exports = {
    getAll,
    create,
    update,
    remove,
    findById
}

function getAll() {
    return db("resources")
}
async function create(resource) {
    const [id] = await db("resources").insert(resource)
    return db("resources").where({ id }).first()
}
async function update(id, changes){
    await  db("resources").update(changes).where({id})
    return db("resources").where({id}).first()
}

function findById(id){
    return db("resources").where({id}).first()
}

function remove(id){
    return db("resources").where({id}).delete()
}