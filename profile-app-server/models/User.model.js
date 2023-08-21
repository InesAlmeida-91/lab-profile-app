const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required.'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    campus: {
      type: String,
      enum: ["Madrid", "Barcelona", "Miami", "Paris", "Berlin", "Amsterdam", "México", "Sao Paulo", "Lisbon", "Remote"],
      required: true
    },
    course: {
      type: String,
      enum: ["Web Dev", "UX/UI", "Data Analytics","Cyber Security"],
      required: true
    },
    image: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
