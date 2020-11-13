
exports.up = async function(knex) {
    await knex.schema.createTable("resources", tbl => {
        tbl.increments();
    
        tbl.string("name").notNullable();
});

};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("resources")
};
