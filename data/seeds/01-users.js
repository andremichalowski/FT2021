const { addOperators } = require("../../routes/users/users-modal");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('operators').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('operators').insert([
        {
          username: 'testName',
          password: 'testPassword',
          email: 'email@gmail.com',
          role: 'operator',
          location: 1
        },
        {
          username: 'testName2',
          password: 'testPassword2',
          email: 'email2@gmail.com',
          role: 'operator',
          location: 2
        },
        {
          username: 'testName3',
          password: 'testPassword3',
          email: 'email3@gmail.com',
          role: 'operator',
          location: 3
        }
      ]);
    });
};
