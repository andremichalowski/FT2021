
const bcrypt = require('bcryptjs');
//this is ridiculous and not secure, don't do this
//only to see if it works

// const hash = bcrypt.hashSync(process.env.USER, 10)
// bcrypt.hashSync("bob",12)

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username:"bob",
          password:bcrypt.hashSync("bob",12),
          email:"bob@bobsburgers.com",
          isOperator:1,
          location:1,
        },
        {
          username:"linda",
          password:bcrypt.hashSync("linda",12),
          email:"linda@bobsburgers.com",
          isOperator:1,
          location:2,
        },
        {
          username:"tina",
          password:bcrypt.hashSync("tina",12),
          email:"tina@bobsburgers.com",
          isOperator:0,
          location:1,
        },
        {
          username:"louise",
          password:bcrypt.hashSync("louise",12),
          email:"louise@bobsburgers.com",
          isOperator:0,
          location:2,
        },
        {
          username:"gene",
          password:bcrypt.hashSync("gene",12),
          email:"gene@bobsburgers.com",
          isOperator:0,
          location:1,
        },
        {
          username:"jimmy",
          password:bcrypt.hashSync("jimmy",12),
          email:"jimmy@pestopizzeria.com",
          isOperator:1,
          location:2,
        },
        {
          username:"tommy",
          password:bcrypt.hashSync("tommy",12),
          email:"tommy@email.com",
          isOperator:1,
          location:3,
        },
      ]);
    });
};
