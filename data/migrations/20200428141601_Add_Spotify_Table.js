
exports.up = function(knex) {
  return knex.schema.createTable("spotifytable",table=>{
      table.increments("id").index();
      table.string("artist_name").notNullable().index();
      table.string("track_id").notNullable().index();
      table.string("track_name").notNullable();
      table.decimal("acousticness").notNullable();
      table.decimal("danceability").notNullable();
      table.integer("duration").notNullable();
      table.decimal("energy").notNullable();
      table.decimal("instrumentalness").notNullable();
      table.integer("key").notNullable();
      table.decimal("liveness").notNullable();
      table.decimal("loudness").notNullable();
      table.integer("mode").notNullable();
      table.decimal("speechiness").notNullable();
      table.decimal("tempo").notNullable();
      table.integer("time_signature").notNullable();
      table.decimal("valence").notNullable();
      table.integer("popularity").notNullable();
      table.integer("track_key").notNullable();
      table.integer("artist_key").notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("spotifytable");
};
