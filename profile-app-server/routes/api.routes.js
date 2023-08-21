const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const { isAuthenticated } = require("./../middleware/jwt.middleware.js");
const fileUploader = require("../config/cloudinary.config");

router.get("/users", isAuthenticated, (req, res) => {
  console.log(`req.payload`, req.payload);
  res.status(200).json(req.payload);
});

router.post("/upload", fileUploader.single("image"), (req, res) => {
  console.log("file is: ", req.file)
  if (!req.file) {
      res.status(400).json({message: "Please upload your photo"});
    return;
  }
  res.json({ image: req.file.path });
}); 


  router.put("/users", (req, res) => {
    const { _id, image } = req.body;
  
    if (!image) {
      res.status(400).json({ message: "Please insert a valid image URL" });
      return;
    }
  
    User.findByIdAndUpdate(_id, { image }, { new: true })
      .then(updatedUser => {
        const { _id, username, image, campus, course } = updatedUser;
        res.json({ updatedUser: { _id, username, image, campus, course } });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
      });
  });

module.exports = router;