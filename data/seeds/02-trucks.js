
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('trucks').del()
    .then(function () {
      // Inserts seed entries
      return knex('trucks').insert([
        {
          name:"Bob's Burgers",
          type:"Burgers",
          photoUrl:"https://i.redd.it/ooj01ytz3l121.jpg",
          location:5,
        },
        {
          name:"Jimmy Pesto's Pizzeria",
          type:"Italian",
          photoUrl:"https://images.unsplash.com/photo-1604624483037-489d287ae9fd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1096&q=80",
          location:7,
        },
        {
          name:"Vietnamese Street Food",
          type:"Vietnamese",
          photoUrl:"https://images.unsplash.com/photo-1567129937968-cdad8f07e2f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1245&q=80",
          location:7,
        },
        {
          name:"Bob's Burgers and Fries",
          type:"Burgers",
          photoUrl:"https://i.redd.it/ooj01ytz3l121.jpg",
          location:5,
        },
      ]);
    });
};
