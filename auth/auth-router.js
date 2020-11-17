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


// //  LOGIN
// router.post("/login", (req, res) => {
//   const { username, password } = req.body;

//   if (isValid(req.body)) {
//     if (Users.findDinersBy({ username }).role === 'diner') {
//         Users.findDinersBy({ username })
//             .then(([diner]) => {
//                 console.log('post /login for diner', diner);
//                 // compare the password the hash stored in the database
//                 if (diner && bcryptjs.compareSync(password, diner.password)) {
//                     const token = getJwt(diner);

//                     res.status(200).json({ message: "Welcome to our API", token });
//                 } else {
//                     res.status(401).json({ message: "Invalid credentials for diner" });
//                 }
//             })
//             .catch(error => {
//                 res.status(500).json({ message: error.message });
//             });

//     } else if (Users.findOperatorsBy({ username }).role === 'operator') {
//         Users.findOperatorsBy({ username })
//             .then(([operator]) => {
//                 console.log('post /login for operator', operator);
//                 debugger;
//                 // compare the password the hash stored in the database
//                 if (operator && bcryptjs.compareSync(password, operator.password)) {
//                     const token = getJwt(operator);

//                     res.status(200).json({ message: "Welcome to our API", token });
//                 } else {
//                     res.status(401).json({ message: "Invalid credentials for operator" });
//                 }
//             })
//             .catch(error => {
//                 res.status(500).json({ message: error.message });
//             });
//     }
//   } else {
//       res.status(400).json({
//           message: "please provide username and password and the password shoud be alphanumeric",
//       });
//   }
// });

//  LOGIN
router.post("/login", (req, res) => {
    const { username, password } = req.body;
    console.log(req.body.role);
    if (isValid(req.body)) {
      if (Users.findOperatorsBy({ username })) { // && operator.role === 'diner'
          
        Users.findOperatorsBy({ username })
              .then(([operator]) => {
                //   console.log('post /login for operator', typeof(operator), operator);
                  if (operator && bcryptjs.compareSync(password, operator.password)) {
                      const token = getJwt(operator);
  
                      res.status(200).json({ message: "Welcome to our API", token });
                  } else {
                      res.status(401).json({ message: "Invalid credentials for operator" });
                  }
              })
              .catch(error => {
                  res.status(500).json({ message: error.message });
              });
      } else if (Users.findDinersBy({ username })) {
          Users.findDinersBy({ username })
              .then(([diner]) => {
                  console.log('post /login for diner', diner);
                  // compare the password the hash stored in the database
                  if (diner && bcryptjs.compareSync(password, diner.password)) {
                      const token = getJwt(diner);
  
                      res.status(200).json({ message: "Welcome to our API", token });
                  } else {
                      res.status(401).json({ message: "Invalid credentials for diner" });
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
    // console.log(user);
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


// .then((data) => {
    //     //   console.log('login post operator:', data.role)
    //     if (data.role === 'operator') {
    //           if (operator && bcryptjs.compareSync(password, operator.password)) {
    //               const token = getJwt(operator);

    //               res.status(200).json({ message: "Welcome to our API", token });
    //           } else {
    //               res.status(401).json({ message: "Invalid credentials for operator" });
    //           }
    //     } else {
    //         console.log('does not exist')
    //     }
    // });