
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('owned_trucks').del()
    .then(function () {
      // Inserts seed entries
      return knex('owned_trucks').insert([
        {
          user_id:1,
          truck_id:1,
        },
        {
          user_id:2,
          truck_id:1,
        },
        {
          user_id:6,
          truck_id:2,
        },
        {
          user_id:7,
          truck_id:3,
        },
        {
          user_id:1,
          truck_id:4,
        },
        {
          user_id:2,
          truck_id:4,
        },
      ]);
    });
};
