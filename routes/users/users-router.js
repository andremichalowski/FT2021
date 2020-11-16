const router = require("express").Router();

const Users = require("./users-modal.JS");

router.get("/test", (req, res) => { 
    Users.find()
        .then(users => {
            res.status(200).json({ users });
        })
        .catch(err=> {
          // res.status(404).json({ message: "test endpoint error"}).send(err);
          console.log(err);
        });
});

module.exports = router;