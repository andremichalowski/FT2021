// const db = require("../database/connection.js");

// module.exports = {
//     add,
//     find,
//     findBy,
//     findById,
// };

// function find() {
//     return db("users").select("id", "username").orderBy("id");
// }

// function findBy(filter) {
//     return db("users as u")
//         .join("roles as r", "u.role", "r.id")
//         .where(filter)
//         .select("u.id", "u.username", "u.password", "r.name as role")
//         .orderBy("u.id");
// }

// async function add(user) {
//     try {
//         const [id] = await db("users").insert(user, "id");

//         return findById(id);
//     } catch (error) {
//         throw error;
//     }
// }

// function findById(id) {
//     return db("users").where({ id }).first();
// }


// // module.exports = {
// //     getAll,
// //     add,
// //     getById,
// //     update,
// //     remove,
// //     getUserPosts,
// // };

// // function getAll() {
// //     return db("users");
// // }

// // function getById(id) {
// //     return db("users").where({ id }).first();
// // }

// // // return the user from the database
// // function add(user) {
// //     return db("users")
// //         .insert(user, "id")
// //         .then(ids => {
// //             const id = ids[0];

// //             // all queries return an array,
// //             // even if it only has one element
// //             // .first() will extract the first element
// //             // from the array and return it
// //             // return db("users").where({ id }).first();

// //             return getById(id);
// //         });
// // }

// // function update(id, changes) {
// //     return db("users").where({ id }).update(changes);
// // }

// // function remove(id) {
// //     return db("users").where({ id }).del();
// // }

// // function getUserPosts(id) {
// //     return db("posts").where("user_id", id);
// // }