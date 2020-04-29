
exports.up = function(knex) {
    return  knex.schema
    .createTable("users_liked", tbl=>{
    //foreign key User_ID
    tbl.integer("user_id")
        .notNullable()
        .references("id")
        .inTable("Users")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    //foreign key Track_ID
    tbl.string("track_id")
        .notNullable()
        .references("id")
        .inTable("spotifytable")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    });

};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("users_liked");
};
