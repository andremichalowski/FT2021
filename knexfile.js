// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/foodtrucks.db3'
    },
    //for sqlite:
    useNullAsDefault: true,

    //for migrations files:
    migrations: {
      directory: './data/migrations'
    },

    //for seed files:
    seeds: {
      directory: './data/seeds'
    },
    
    //needed for cascading delete/update
    pool: {
      afterCreate: (conn, done) => {
        // runs after a connection is made to the sqlite engine
        conn.run('PRAGMA foreign_keys = ON', done); // turn on FK enforcement
      },
    },
  },
  production: {
    client: 'sqlite3',
    connection: {
      filename: './data/foodtrucks.db3'
    },
    //for sqlite:
    useNullAsDefault: true,

    //for migrations files:
    migrations: {
      directory: './data/migrations'
    },

    //for seed files:
    seeds: {
      directory: './data/seeds'
    },
    
    //needed for cascading delete/update
    pool: {
      afterCreate: (conn, done) => {
        // runs after a connection is made to the sqlite engine
        conn.run('PRAGMA foreign_keys = ON', done); // turn on FK enforcement
      },
    },
  }
};
