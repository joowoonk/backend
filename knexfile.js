// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault:true,
    connection: {
      filename: './data/spotifySuggester.db3'
    },migrations:{
      directory: "./data/migrations"
    },seeds:{
      directory:"./data/seeds"
    },pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
  },
  production: {
    client: 'pg',
    connection: process.env.HEROKU_POSTGRESQL_ROSE_URL,
    migrations: {
      directory: "./data/migrations"
    }
  }
};
