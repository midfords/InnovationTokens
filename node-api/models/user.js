const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  first: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 255
  },
  last: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 255
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  profileId: {
    type: Number,
    required: true
  },
  managerId: {
    type: String
  },
  roles: [String],
  balance: Number
});

userSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    {
      _id: this._id,
      roles: this.roles,
      first: this.first,
      last: this.last
    },
    config.get("jwtPrivateKey")
  );
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    first: Joi.string()
      .min(1)
      .max(255)
      .required(),
    last: Joi.string()
      .min(1)
      .max(255)
      .required(),
    email: Joi.string()
      .min(1)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
    profileId: Joi.number()
      .integer()
      .min(1)
      .max(8)
      .required(),
    managerId: Joi.string().allow("")
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
