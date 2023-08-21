const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { isAuthenticated } = require("./../middleware/jwt.middleware.js");

 
const router = express.Router();
const saltRounds = 10;

router.post("/signup", (req, res, next) => {
    const {username, password, campus, course, image} = req.body;

    if (username === '' || password === '' || campus === '' || course === '') {
        res.status(400).json({ message: "Please provide all fields" });
        return;
      }
    
      const usernameRegex = /^[a-zA-Z0-9]+$/;
      if (!usernameRegex.test(username)) {
        res.status(400).json({ message: 'Provide a Username with letters and/or numbers, no special characters allowed.' });
        return;
      }
    
      const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
      if (!passwordRegex.test(password)) {
        res.status(400).json({ message: 'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.' });
        return;
      }

    User.findOne({ username })
        .then((foundUser) => {
            if (foundUser) {
            res.status(400).json({ message: "User already exists." });
            return;
        }

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);
      return User.create({ username, password: hashedPassword, campus, course });
    })
    .then((createdUser) => {
      const { username, campus, course, _id } = createdUser;
    
      const user = { username, campus, course, _id };
 
      res.status(201).json({ user: user });
    })
    .catch(err => {console.log(err);
        res.server(500).json({message: "Internal Server Error"})
    })
})
 
 
router.post("/login", (req, res, next) => {
    const { username, password } = req.body;

    if(username === '' || password === '') {
        res.status(400).json({ message: "Provide Username and Password" })
        return;
    }

    User.findOne({ username })
        .then((foundUser) => {
            if(!foundUser) {
                res.status(401).json({ message: "User not found. Please try again"})
                return;
            }

            const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

            if (passwordCorrect) {
                const { _id, username } = foundUser;
                const payload = { _id, username };

                const authToken = jwt.sign( 
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: "6h" }
                  );
                  res.status(200).json({ authToken: authToken });
            }
            else {
                res.status(401).json({ message: "Unable to authenticate the user" });
                }
        }) 
        .catch(err => {console.log(err);
            res.server(500).json({message: "Internal Server Error"})
        })
    });
 
 

router.get('/verify', isAuthenticated, (req, res, next) => {
    console.log(`req.payload`, req.payload);
    res.status(200).json(req.payload);
  });
 
module.exports = router;