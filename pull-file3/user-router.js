// const express = require("express");

// const Users = require("./user-model.js");

// const router = express.Router();

// /* 	- USERS:
// 		○ POST users/login
// 		○ POST users/register
// 		○ GET trucks/
// 			§ gets an array of all trucks to display
// 	- DINER:
// 		○ GET diner/trucks
// 			§ gets an array of favorite trucks
// 			§ table: diners_trucks
// 		○ GET menu_items/:truck_id
// 			§ gets a list of menu items for a given truck
// 		○ GET menu_ratings/:truck_id
// 			§ gets a list of all ratings for a truck
// 		○ POST menu_ratings/:menuItem_id
// 			§ post a new rating for the menu item
// 	- OPERATOR: 
// 		○ GET operator/trucks
// 			• gets an array of all owned trucks
// 			• table: operators_trucks
// 		○ GET trucks/:id
// 		○ POST trucks/
// 		○ PUT trucks/:id
// 		○ DELETE trucks/:id
// 	- each has: 
// 		○ name
// 		○ image
// 		○ type
// 		○ avgRating
// 		○ array of ratings
    
//         */

// router.get("/", (req, res) => {
//   Users.getAll()
//     .then((users) => {
//       res.json(users);
//     })
//     .catch((err) => {
//       res.status(500).json({ message: "Failed to get users" });
//     });
// });

// router.get("/:id", (req, res) => {
//   const { id } = req.params;

//   Users.getById(id)
//     .then((user) => {
//       if (user) {
//         res.json(user);
//       } else {
//         res.status(404).json({ message: "Could not find user with given id." });
//       }
//     })
//     .catch((err) => {
//       res.status(500).json({ message: "Failed to get user" });
//     });
// });

// router.post("/", (req, res) => {
//   const userData = req.body;

//   Users.add(userData)
//     .then((user) => {
//       res.status(201).json({ created: user });
//     })
//     .catch((err) => {
//       res.status(500).json({ message: "Failed to create new user" });
//     });
// });

// router.put("/:id", (req, res) => {
//   const { id } = req.params;
//   const changes = req.body;

//   Users.update(id, changes)
//     .then((count) => {
//       if (count) {
//         res.json({ update: count });
//       } else {
//         res.status(404).json({ message: "Could not find user with given id" });
//       }
//     })
//     .catch((err) => {
//       res.status(500).json({ message: "Failed to update user" });
//     });
// });

// router.delete("/:id", (req, res) => {
//   const { id } = req.params;

//   Users.remove(id)
//     .then((count) => {
//       if (count) {
//         res.json({ removed: count });
//       } else {
//         res.status(404).json({ message: "Could not find user with given id" });
//       }
//     })
//     .catch((err) => {
//       res.status(500).json({ message: "Failed to delete user" });
//     });
// });

// router.get("/:id/posts", (req, res) => {
//   Users.getUserPosts(req.params.id)
//     .then((posts) => {
//       res.status(200).json({ data: posts });
//     })
//     .catch((err) => {
//       res.status(500).json({ message: err.message });
//     });
// });

// module.exports = router;
