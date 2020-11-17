// const db = require("../data/db-config.js");

// module.exports = {
//     getAll,
//     add,
//     getById,
//     update,
//     remove,
//     getUserPosts,
// };

// function getAll() {
//     return db("users");
// }

// function getById(id) {
//     return db("users").where({ id }).first();
// }

// // return the user from the database
// function add(user) {
//     return db("users")
//         .insert(user, "id")
//         .then(ids => {
//             const id = ids[0];

//             // all queries return an array,
//             // even if it only has one element
//             // .first() will extract the first element
//             // from the array and return it
//             // return db("users").where({ id }).first();

//             return getById(id);
//         });
// }

// function update(id, changes) {
//     return db("users").where({ id }).update(changes);
// }

// function remove(id) {
//     return db("users").where({ id }).del();
// }

// function getUserPosts(id) {
//     return db("posts").where("user_id", id);
// }
