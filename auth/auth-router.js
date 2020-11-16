const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = require("express").Router();
const secret = require("../api/secret.js");

const Users = require("../routes/users/users-modal.js");
const { isValid } = require("../routes/users/users-service.js");

router.post("/register", (req, res) => {
    const credentials = req.body;

    if (isValid(credentials)) {
        const rounds = process.env.BCRYPT_ROUNDS || 8;

        // hash the password
        const hash = bcryptjs.hashSync(credentials.password, rounds);

        credentials.password = hash;
        
        if (credentials.role === 'operator') {
        // save the user to the database
            Users.addOperators(credentials)
                .then(operator => {
                    res.status(201).json({ data: operator });
                })
                .catch(error => {
                    res.status(500).json({ message: error.message });
                });
        } else if (credentials.role === 'diner') {
            Users.addDiners(credentials)
            .then(diner => {
                res.status(201).json({ data: diner });
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
        };
    } else {
        res.status(400).json({
            message: "please provide username and password and the password shoud be alphanumeric",
        });
    }
});


//  LOGIN
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (isValid(req.body)) {
    if (Users.findOperatorsBy({ username})) {
        Users.findOperatorsBy({ username })
            .then(([operator]) => {
                // compare the password the hash stored in the database
                if (operator && bcryptjs.compareSync(password, operator.password)) {
                    const token = getJwt(operator);

                    res.status(200).json({ message: "Welcome to our API", token });
                } else {
                    res.status(401).json({ message: "Invalid credentials" });
                }
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    } else {
        Users.findDinersBy({ username })
            .then(([diner]) => {
                // compare the password the hash stored in the database
                if (diner && bcryptjs.compareSync(password, diner.password)) {
                    const token = getJwt(diner);

                    res.status(200).json({ message: "Welcome to our API", token });
                } else {
                    res.status(401).json({ message: "Invalid credentials" });
                }
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    }
  } else {
      res.status(400).json({
          message: "please provide username and password and the password shoud be alphanumeric",
      });
  }
});


function getJwt(user) {
  const payload = {
      username: user.username,
      role: user.role,
  };

  const jwtOptions = {
      expiresIn: "8h",
  };

  return jwt.sign(payload, secret.jwtSecret, jwtOptions);
}


module.exports = router;
