const router = require("express").Router();

const Users = require("./users-modal.js");
const restricted = require("../../auth/restricted-middleware.js");

router.get("/testOperators", restricted, checkRole('operator'), (req, res) => { 
    Users.findOperators()
        .then(operators => {
            res.status(200).json({ operators, jwt: req.jwt });
        })
        .catch(err=> {
          res.status(404).json({ message: "test endpoint error"}).send(err);
          console.log(err);
        });
});

function checkRole(role) { // 1. write it
  return function (req, res, next) {
    console.log(req.jwt);
      if (req.jwt.role === role) {
          next();
      } else {
          res.status(403).json({ message: "You must be a Food Truck owner to access this page" });
      }
  };
}

module.exports = router;