const router = require("express").Router();

const Users = require("./users-modal.JS");
const restricted = require("../../auth/restricted-middleware.js");

router.get("/test", restricted, /*checkRole()*/ (req, res) => { 
    Users.findOperators()
        .then(operators => {
            res.status(200).json({ operators, jwt: req.jwt });
        })
        .catch(err=> {
          res.status(404).json({ message: "test endpoint error"}).send(err);
          console.log(err);
        });
});

// function checkRole(role) { // 1. write it
//   return function (req, res, next) {
//       if (req.jwt.role === role) {
//           next();
//       } else {
//           res.status(403).json({ message: "you have no access" });
//       }
//   };
// }

module.exports = router;